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
      title: "YouTube Video Production Outline",
      category: "draft",
      content: "Script outline for Collectly 2.0 announcement video: 1. The problem with scattered notes. 2. AI capture with human review. 3. Real-time Kanban board walkthrough.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

  const [activeDoc, setActiveDoc] = useState<DocumentItem>(documents[0]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);
  const [search, setSearch] = useState("");

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
      title: "Untitled Note",
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
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
              Knowledge Hub
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Documents & Notes</h1>
          <p className="text-sm text-gray-400 mt-1">
            Store project briefs, meeting notes, and convert them to tasks with one click.
          </p>
        </div>

        <button
          onClick={handleCreateNewDoc}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          New Document
        </button>
      </div>

      {/* Editor & List Split View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Column: Document List */}
        <div className="md:col-span-4 bg-[#111114] border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  activeDoc.id === doc.id
                    ? "bg-[#18181d] border-indigo-500/60 shadow-sm"
                    : "bg-[#0d0d10] hover:bg-[#141418] border-gray-900"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-white line-clamp-1">{doc.title}</span>
                  <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 uppercase">
                    {doc.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {doc.content || "Empty document..."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Note Editor */}
        <div className="md:col-span-8 bg-[#111114] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <input
                type="text"
                value={activeDoc.title}
                onChange={(e) => updateActiveTitle(e.target.value)}
                placeholder="Document title..."
                className="text-xl font-bold font-serif text-white bg-transparent focus:outline-none flex-1"
              />

              <button
                onClick={handleExtractFromDoc}
                disabled={isExtracting || !activeDoc.content.trim()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                {isExtracting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Extract to Tasks
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={16}
              value={activeDoc.content}
              onChange={(e) => updateActiveContent(e.target.value)}
              placeholder="Write meeting notes, project briefs, or dump text here..."
              className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
            <span>Last modified: {new Date(activeDoc.updated_at).toLocaleTimeString()}</span>
            <span className="flex items-center gap-1 text-indigo-400">
              <FileText className="w-3.5 h-3.5" /> Markdown ready
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
            alert(`Approved and added ${approved.length} task(s) from "${activeDoc.title}" to your workspace!`);
            setReviewData(null);
          }}
        />
      )}
    </div>
  );
}
