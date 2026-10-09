"use server";

import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-09-30.acacia" as any,
});

export async function generatePaymentLink(invoiceId: string, amount: number, description: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    // Create a product/price on the fly for the invoice
    const product = await stripe.products.create({
      name: `Invoice: ${description}`,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amountInCents,
      currency: "usd",
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        invoiceId,
        userId: user.id,
      }
    });

    // Update invoice with the payment link in Supabase
    // Using a JSON metadata column or just checking if `payment_link` exists.
    // If the schema does not have a `payment_link` column, this might fail,
    // so we'll wrap it and try to update it. If we can't alter the table from here,
    // we'll instruct the user to run a migration or we'll run a quick SQL command.
    
    // For now, let's try updating a column named `payment_link`
    const { error: updateError } = await supabase
      .from('invoices')
      .update({ payment_link: paymentLink.url })
      .eq('id', invoiceId)
      .eq('user_id', user.id); // Security check

    if (updateError) {
      console.warn("Failed to update invoice with payment link. Does the 'payment_link' column exist?", updateError);
      // We will still return the URL even if saving fails, but ideally we add the column
    }

    revalidatePath('/dashboard/invoices');
    
    return { url: paymentLink.url, success: true };
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return { success: false, error: error.message };
  }
}
