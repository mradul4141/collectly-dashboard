"use client";

import { useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { ArrowUpRight, TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";

interface Invoice {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  due_date: string;
}

export function AnalyticsDashboard({ invoices }: { invoices: Invoice[] }) {
  // Aggregate KPIs
  const kpis = useMemo(() => {
    let totalCollected = 0;
    let totalOutstanding = 0;
    let overdueCount = 0;
    
    invoices.forEach(inv => {
      const amount = Number(inv.amount);
      if (inv.status === 'paid') {
        totalCollected += amount;
      } else {
        totalOutstanding += amount;
      }
      if (inv.status === 'overdue') {
        overdueCount++;
      }
    });

    const successRate = invoices.length > 0 
      ? Math.round((invoices.filter(i => i.status === 'paid').length / invoices.length) * 100) 
      : 0;

    return { totalCollected, totalOutstanding, overdueCount, successRate };
  }, [invoices]);

  // Aggregate Status for Pie Chart
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    invoices.forEach(inv => {
      counts[inv.status] = (counts[inv.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name: name.replace('_', ' '), value }));
  }, [invoices]);

  const COLORS = ['#FF6B00', '#222222', '#666666', '#AAAAAA', '#FFFFFF'];

  // Aggregate Monthly Cash Flow
  const monthlyData = useMemo(() => {
    const monthly: Record<string, { month: string, Collected: number, Outstanding: number }> = {};
    
    invoices.forEach(inv => {
      const date = new Date(inv.created_at);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      
      if (!monthly[monthStr]) {
        monthly[monthStr] = { month: monthStr, Collected: 0, Outstanding: 0 };
      }
      
      if (inv.status === 'paid') {
        monthly[monthStr].Collected += Number(inv.amount);
      } else {
        monthly[monthStr].Outstanding += Number(inv.amount);
      }
    });

    return Object.values(monthly);
  }, [invoices]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111] border border-[#222] p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm font-semibold text-gray-400">Total Collected</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${kpis.totalCollected.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </div>
          <div className="flex items-center text-xs font-bold text-orange-500">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +14% from last month
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm font-semibold text-gray-400">Outstanding Balance</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${kpis.totalOutstanding.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {kpis.overdueCount} overdue invoices
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm font-semibold text-gray-400">Success Rate</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {kpis.successRate}%
          </div>
          <div className="text-xs font-semibold text-gray-500">
            Of total generated invoices
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
              <Clock className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm font-semibold text-gray-400">Avg Time to Pay</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            12 Days
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
            -2 days vs average
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Bar Chart */}
        <div className="bg-[#111] border border-[#222] p-5 rounded-xl lg:col-span-2">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Cash Flow Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <RechartsTooltip 
                  cursor={{fill: '#222'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Collected" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Outstanding" fill="#333333" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Invoice Status Pie Chart */}
        <div className="bg-[#111] border border-[#222] p-5 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Invoice Status Distribution</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-gray-500 font-medium">No invoice data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
