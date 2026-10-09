"use client";

import { useState, useEffect } from "react";
import { User, Image as ImageIcon, CreditCard, Save, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    agencyName: "",
    adminName: "",
    email: "",
    stripeKey: "",
  });

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({ ...prev, email: user.email || "" }));
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (profile) {
          setFormData({
            agencyName: profile.agency_name || "",
            adminName: profile.admin_name || "",
            email: profile.contact_email || user.email || "",
            stripeKey: profile.stripe_key || "",
          });
        }
      }
      setIsLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          agency_name: formData.agencyName,
          admin_name: formData.adminName,
          contact_email: formData.email,
          stripe_key: formData.stripeKey,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
        
      if (!error) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Error saving profile:", error);
      }
    }
    
    setIsSaving(false);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Settings</h2>
          <p className="text-sm font-medium text-gray-400">Manage your agency profile, branding, and payment connections.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 text-[13px] font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${activeTab === "profile" ? "bg-[#1a1a1a] text-white border border-[#333]" : "text-gray-500 hover:text-white hover:bg-[#111]"}`}
          >
            <User className="w-4 h-4" />
            General Profile
          </button>
          <button 
            onClick={() => setActiveTab("branding")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${activeTab === "branding" ? "bg-[#1a1a1a] text-white border border-[#333]" : "text-gray-500 hover:text-white hover:bg-[#111]"}`}
          >
            <ImageIcon className="w-4 h-4" />
            Branding
          </button>
          <button 
            onClick={() => setActiveTab("payments")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${activeTab === "payments" ? "bg-[#1a1a1a] text-white border border-[#333]" : "text-gray-500 hover:text-white hover:bg-[#111]"}`}
          >
            <CreditCard className="w-4 h-4" />
            Payment Providers
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-card rounded-[32px] p-8">
          {showSuccess && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5" />
              Settings saved successfully.
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-6">General Profile</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Agency Name</label>
                  <input 
                    type="text" 
                    value={formData.agencyName}
                    onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] rounded-2xl px-4 py-3.5 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Administrator Name</label>
                  <input 
                    type="text" 
                    value={formData.adminName}
                    onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] rounded-2xl px-4 py-3.5 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Contact Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] rounded-2xl px-4 py-3.5 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-6">Branding</h3>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Company Logo</label>
                <div className="border-2 border-dashed border-[#333] rounded-3xl p-10 flex flex-col items-center justify-center bg-[#0a0a0a]/50 hover:bg-[#111] transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">Click to upload logo</p>
                  <p className="text-xs text-gray-500 font-medium">SVG, PNG, or JPG (max 2MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1 mt-6">Brand Color</label>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 border-2 border-white ring-4 ring-orange-500/20 cursor-pointer shadow-lg shadow-orange-500/20"></div>
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-transparent hover:border-gray-500 cursor-pointer"></div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 border-2 border-transparent hover:border-gray-500 cursor-pointer"></div>
                  <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-transparent hover:border-gray-500 cursor-pointer"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-6">Payment Providers</h3>
              
              <div className="bg-[#111] border border-[#222] rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Stripe Connection</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Accept credit cards and ACH</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
                    Connected
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">Live Secret Key</label>
                  <input 
                    type="password" 
                    value={formData.stripeKey}
                    onChange={(e) => setFormData({...formData, stripeKey: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl px-4 py-3 text-sm text-gray-400 font-mono outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="bg-[#111]/50 border border-[#222] rounded-3xl p-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <span className="font-serif font-bold text-xl text-blue-400 italic">P</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">PayPal Connection</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Connect your PayPal business account</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold bg-[#222] text-white px-4 py-2 rounded-lg hover:bg-[#333] transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
