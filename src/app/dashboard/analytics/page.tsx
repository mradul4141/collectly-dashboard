import { createClient } from "@/utils/supabase/server";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  // Fetch all invoices for this user
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('id, amount, status, created_at, due_date')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching analytics data", error);
    return <div>Error loading analytics</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Analytics</h2>
          <p className="text-sm font-medium text-gray-400">Track your cash flow, recovery rates, and platform performance.</p>
        </div>
      </div>

      <AnalyticsDashboard invoices={invoices || []} />
    </div>
  );
}
