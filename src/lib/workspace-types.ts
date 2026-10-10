export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  user_id: string;
  project_id?: string | null;
  project_name?: string | null;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: Priority;
  due_date?: string | null;
  is_completed: boolean;
  ai_generated?: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  status: "not_started" | "in_progress" | "completed" | "on_hold";
  color?: string;
  due_date?: string | null;
  task_count?: number;
  completed_count?: number;
  created_at: string;
}

export interface DocumentItem {
  id: string;
  user_id: string;
  project_id?: string | null;
  title: string;
  content: string;
  category: "meeting_notes" | "proposal" | "guide" | "draft" | "general";
  created_at: string;
  updated_at: string;
}

export interface AIExtractionResult {
  summary: string;
  objective: string;
  suggestedTasks: {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string;
    selected: boolean;
  }[];
  suggestedNotes?: string;
  detectedProject?: string;
}
