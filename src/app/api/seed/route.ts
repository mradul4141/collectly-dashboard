import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // Get current logged in user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Check if they already have clients to avoid duplicate seeding
  const { data: existingClients } = await supabase
    .from('clients')
    .select('id')
    .limit(1)

  if (existingClients && existingClients.length > 0) {
    return NextResponse.json({ message: 'Database already seeded!' })
  }

  // Insert Mock Clients
  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .insert([
      { user_id: user.id, name: 'Elena Rostova', company: 'Nova Brands Digital', email: 'elena@novabrands.test' },
      { user_id: user.id, name: 'Marcus Chen', company: 'TechCorp Inc.', email: 'marcus@techcorp.test' },
      { user_id: user.id, name: 'Sarah Jenkins', company: 'Jenkins Consulting', email: 'sarah@jenkins.test' }
    ])
    .select()

  if (clientsError || !clients) {
    return NextResponse.json({ error: clientsError }, { status: 500 })
  }

  // Insert Mock Invoices linked to those clients
  const { error: invoicesError } = await supabase
    .from('invoices')
    .insert([
      { 
        user_id: user.id, 
        client_id: clients[0].id, 
        invoice_number: 'INV-2026-091', 
        amount: 3400.00, 
        status: 'promised', 
        due_date: '2026-09-22',
        description: 'Shopify Plus Redesign - Milestone 3',
        cadence: '+7d'
      },
      { 
        user_id: user.id, 
        client_id: clients[1].id, 
        invoice_number: 'INV-2026-092', 
        amount: 5000.00, 
        status: 'due_soon', 
        due_date: '2026-10-08',
        description: 'Q3 Retainer',
        cadence: '-3d'
      },
      { 
        user_id: user.id, 
        client_id: clients[2].id, 
        invoice_number: 'INV-2026-093', 
        amount: 1250.00, 
        status: 'overdue', 
        due_date: '2026-09-15',
        description: 'SEO Audit',
        cadence: '+22d'
      }
    ])

  if (invoicesError) {
    return NextResponse.json({ error: invoicesError }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: 'Database successfully seeded with realistic mock data!' })
}
