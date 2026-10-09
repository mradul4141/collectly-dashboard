import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-09-30.acacia' as any,
});

// Initialize Supabase with the SERVICE_ROLE_KEY to bypass RLS
// We need this because webhook requests come from Stripe and have no user session.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // We retrieve the invoiceId we passed into the metadata when creating the link
        // Note: For Payment Links, metadata is often copied to the checkout session
        // or we need to retrieve the original payment link/intent if it's not directly on the session.
        // If we passed metadata directly to paymentLinks.create(), we might need to fetch the payment link first.
        
        let invoiceId = session.metadata?.invoiceId;

        // If it's not on the session directly, fetch the related Payment Link to get its metadata
        if (!invoiceId && session.payment_link) {
           const paymentLink = await stripe.paymentLinks.retrieve(session.payment_link as string);
           invoiceId = paymentLink.metadata?.invoiceId;
        }

        if (invoiceId) {
          // Update the invoice status in Supabase
          const { error } = await supabase
            .from('invoices')
            .update({ 
              status: 'paid',
              updated_at: new Date().toISOString()
            })
            .eq('id', invoiceId);

          if (error) {
            console.error('Failed to update invoice in Supabase:', error);
            throw error;
          }
          console.log(`Successfully marked invoice ${invoiceId} as paid.`);
        } else {
          console.warn('No invoiceId found in session or payment link metadata.');
        }
        break;
      }
      default:
        // Unhandled event type
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
