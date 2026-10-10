import { NextRequest, NextResponse } from "next/server";
import { AIExtractionResult, Priority } from "@/lib/workspace-types";

// Reliable, resilient AI extraction engine
// Uses GEMINI_API_KEY when configured; otherwise falls back to deterministic NLP heuristic extraction.
export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide text or notes to analyze." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // 1. If Gemini API key is configured, use official Google Gemini API
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI assistant for Collectly, an all-in-one productivity workspace. 
Extract structured action items, objective, and suggested tasks from the following user input.
Return ONLY valid raw JSON with this exact schema:
{
  "summary": "Brief 1-sentence summary",
  "objective": "Primary goal",
  "detectedProject": "Suggested project name or null",
  "suggestedTasks": [
    {
      "id": "task-1",
      "title": "Clear actionable task title",
      "description": "Optional details",
      "priority": "low" | "medium" | "high" | "urgent",
      "dueDate": "YYYY-MM-DD or relative like 'This Friday'",
      "selected": true
    }
  ],
  "suggestedNotes": "Any extra reference info"
}

User input:
"""${input}"""`
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed: AIExtractionResult = JSON.parse(candidateText);
            return NextResponse.json({ success: true, mode: "live_ai", result: parsed });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local extractor:", geminiError);
      }
    }

    // 2. Local Deterministic Natural Language Extractor (Runs anytime with ZERO external dependencies)
    const result = extractStructuredTasksLocally(input);
    return NextResponse.json({ success: true, mode: "demo_local", result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process text." },
      { status: 500 }
    );
  }
}

function extractStructuredTasksLocally(text: string): AIExtractionResult {
  const lines = text
    .split(/\n|\. |\; /)
    .map((l) => l.trim())
    .filter((l) => l.length > 4);

  // Priority detection
  let detectedPriority: Priority = "medium";
  const lower = text.toLowerCase();
  if (lower.includes("urgent") || lower.includes("asap") || lower.includes("immediately")) {
    detectedPriority = "urgent";
  } else if (lower.includes("important") || lower.includes("critical") || lower.includes("high")) {
    detectedPriority = "high";
  }

  // Date detection
  let dueDate = "This Friday";
  if (lower.includes("tomorrow")) dueDate = "Tomorrow";
  else if (lower.includes("monday")) dueDate = "Next Monday";
  else if (lower.includes("friday")) dueDate = "This Friday";
  else if (lower.includes("end of week") || lower.includes("eow")) dueDate = "End of Week";

  // Project detection
  let detectedProject = "General Workspace";
  if (lower.includes("client") || lower.includes("proposal")) detectedProject = "Client Deliverables";
  else if (lower.includes("launch") || lower.includes("product")) detectedProject = "Product Roadmap";
  else if (lower.includes("design") || lower.includes("figma")) detectedProject = "Design & UI";

  const suggestedTasks = lines.slice(0, 5).map((line, idx) => {
    // Clean imperative verbs
    const cleanTitle = line
      .replace(/^[-*•\d.)\s]+/, "")
      .replace(/^prepare |^update |^send |^create |^draft /i, (match) => match.charAt(0).toUpperCase() + match.slice(1));

    return {
      id: `task-${Date.now()}-${idx}`,
      title: cleanTitle.length > 60 ? cleanTitle.slice(0, 57) + "..." : cleanTitle,
      description: line.length > 60 ? line : undefined,
      priority: idx === 0 ? detectedPriority : ("medium" as Priority),
      dueDate: idx === 0 ? dueDate : undefined,
      selected: true
    };
  });

  return {
    summary: `Identified ${suggestedTasks.length} action item(s) from your input.`,
    objective: lines[0] || "Review & execute captured notes",
    detectedProject,
    suggestedTasks: suggestedTasks.length > 0 ? suggestedTasks : [
      {
        id: `task-${Date.now()}-default`,
        title: text.slice(0, 50),
        priority: "medium",
        dueDate: "This Week",
        selected: true
      }
    ],
    suggestedNotes: text
  };
}
