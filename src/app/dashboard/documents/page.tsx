"use client";

import { useState } from "react";
import { FileText, Plus, Sparkles, FolderKanban, Search, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { DocumentItem } from "@/lib/workspace-types";
import { AIReviewModal } from "@/components/ai-review-modal";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      user_id: "demo",
      project_id: "proj-1",
      title: "Client Deliverables Q4 Scope & Terms",
      category: "proposal",
      content: "Summary of agreed deliverables for November: Update pricing sheet, revise invoice payment schedule, conduct milestone walkthrough call on Friday.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "doc-2",
      user_id: "demo",
      project_id: "proj-2",
      title: "Space Log & Product Transmission Outline",
      category: "draft",
      content: "Transmission outline for Collectly 2.0 announcement:\n1. The problem with scattered notes and lost invoices.\n2. AI capture with human review gates.\n3. Real-time orbital Kanban mission board.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

  const [activeDoc, setActiveDoc] = useState<DocumentItem>(documents[0]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "editor">("editor");

  const handleExtractFromDoc = async () => {
    if (!activeDoc.content.trim()) return;

    setIsExtracting(true);
    try {
      const res = await fetch("/api/ai/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: `${activeDoc.title}\n${activeDoc.content}` })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setReviewData({ result: data.result, mode: data.mode });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCreateNewDoc = () => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      user_id: "demo",
      title: "Untitled Field Log",
      category: "general",
      content: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setDocuments([newDoc, ...documents]);
    setActiveDoc(newDoc);
  };

  const updateActiveContent = (content: string) => {
    const updated = { ...activeDoc, content, updated_at: new Date().toISOString() };
    setActiveDoc(updated);
    setDocuments(documents.map(d => d.id === updated.id ? updated : d));
  };

  const updateActiveTitle = (title: string) => {
    const updated = { ...activeDoc, title, updated_at: new Date().toISOString() };
    setActiveDoc(updated);
    setDocuments(documents.map(d => d.id === updated.id ? updated : d));
  };

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A0A0A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] bg-[#DEDEC8] px-2.5 py-0.5 rounded-full border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
              ARCHIVE // KNOWLEDGE REPOSITORY
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight uppercase">
            DOCUMENTS & FLIGHT LOGS
          </h1>
          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 mt-1 font-sans">
            Store mission briefs, meeting transcripts, and decode actionable tasks with AI assistance.
          </p>
        </div>

        <button
          onClick={handleCreateNewDoc}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white rounded-full font-label text-xs uppercase tracking-wider font-bold transition-all border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          NEW FIELD LOG
        </button>
      </div>
      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden items-center gap-2 bg-white border-2 border-[#0A0A0A] p-1.5 rounded-full shadow-[3px_3px_0px_#0A0A0A]">
        <button
          onClick={() => setMobileView("list")}
          className={`flex-1 py-1.5 rounded-full font-label text-xs uppercase font-bold transition-all ${
            mobileView === "list" ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]" : "text-[#0A0A0A]"
          }`}
        >
          ARCHIVE LIST ({documents.length})
        </button>
        <button
          onClick={() => setMobileView("editor")}
          className={`flex-1 py-1.5 rounded-full font-label text-xs uppercase font-bold transition-all ${
            mobileView === "editor" ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]" : "text-[#0A0A0A]"
          }`}
        >
          FIELD LOG EDITOR
        </button>
      </div>

      {/* Editor & List Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[620px]">
        {/* Left Column: Document List */}
        <div className={`md:col-span-4 bg-white border-2 border-[#0A0A0A] rounded-[22px] p-4 flex flex-col gap-3 shadow-[5px_5px_0px_#0A0A0A] ${
          mobileView === "list" ? "block" : "hidden md:flex"
        }`}>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#0A0A0A]/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH ARCHIVE..."
              className="w-full bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-full pl-9 pr-3 py-1.5 text-xs text-[#0A0A0A] placeholder-[#0A0A0A]/50 font-label tracking-wider uppercase focus:outline-none focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setActiveDoc(doc);
                  setMobileView("editor");
                }}
                className={`p-3.5 rounded-[16px] border-2 transition-all cursor-pointer ${
                  activeDoc.id === doc.id
                    ? "bg-[#DEDEC8] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]"
                    : "bg-white hover:bg-neutral-50 border-[#0A0A0A]/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-label text-xs font-bold text-[#0A0A0A] uppercase tracking-wide line-clamp-1">
                    {doc.title}
                  </span>
                  <span className="font-label text-[9px] font-bold text-[#0A0A0A] bg-white px-1.5 py-0.5 rounded border border-[#0A0A0A] uppercase tracking-wider">
                    {doc.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#0A0A0A]/70 line-clamp-2 leading-relaxed font-sans">
                  {doc.content || "Empty document..."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Note Editor */}
        <div className={`md:col-span-8 bg-white border-2 border-[#0A0A0A] rounded-[22px] p-4 sm:p-6 flex flex-col justify-between shadow-[6px_6px_0px_#0A0A0A] ${
          mobileView === "editor" ? "block" : "hidden md:flex"
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-4">
              <input
                type="text"
                value={activeDoc.title}
                onChange={(e) => updateActiveTitle(e.target.value)}
                placeholder="FIELD LOG TITLE..."
                className="text-lg sm:text-xl font-display uppercase tracking-wide text-[#0A0A0A] bg-transparent focus:outline-none flex-1 mr-4"
              />

              <button
                onClick={handleExtractFromDoc}
                disabled={isExtracting || !activeDoc.content.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#222] disabled:opacity-40 text-white font-label text-xs uppercase tracking-wider font-bold shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                {isExtracting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    DECODING...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    EXTRACT TO TASKS
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={16}
              value={activeDoc.content}
              onChange={(e) => updateActiveContent(e.target.value)}
              placeholder="Record mission parameters, meeting discussions, or paste raw intelligence payload here..."
              className="w-full bg-transparent text-sm text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none resize-none leading-relaxed font-mono"
            />
          </div>

          <div className="pt-4 border-t-2 border-[#0A0A0A]/10 flex items-center justify-between text-xs font-label uppercase tracking-wider text-[#0A0A0A]/70">
            <span>LAST TRANSMISSION: {new Date(activeDoc.updated_at).toLocaleTimeString()}</span>
            <span className="flex items-center gap-1 text-[#0A0A0A] font-bold">
              <FileText className="w-3.5 h-3.5" /> MARKDOWN // READY
            </span>
          </div>
        </div>
      </div>

      {/* Review Modal for Extracted Tasks */}
      {reviewData && (
        <AIReviewModal
          initialResult={reviewData.result}
          mode={reviewData.mode}
          onClose={() => setReviewData(null)}
          onApprove={(approved) => {
            alert(`Approved and added ${approved.length} mission task(s) from "${activeDoc.title}" to your workspace!`);
            setReviewData(null);
          }}
        />
      )}
    </div>
  );
}
