-- COLLECTLY 2.0 WORKSPACE SCHEMA
-- Additive tables for Projects, Tasks, Documents/Knowledge, and AI Processing Jobs.
-- Non-destructive: Does not alter existing client or invoice tables.

-- 1. Projects Table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  status text default 'in_progress', -- 'not_started', 'in_progress', 'completed', 'on_hold'
  color text default '#6366f1',
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on projects
alter table public.projects enable row level security;

create policy "Users can only view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);


-- 2. Tasks Table
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  project_id uuid references public.projects on delete set null,
  title text not null,
  description text,
  status text default 'todo', -- 'todo', 'in_progress', 'review', 'done'
  priority text default 'medium', -- 'low', 'medium', 'high', 'urgent'
  due_date date,
  is_completed boolean default false,
  ai_generated boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on tasks
alter table public.tasks enable row level security;

create policy "Users can only view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can create their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);


-- 3. Documents / Knowledge Notes Table
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  project_id uuid references public.projects on delete set null,
  title text not null,
  content text default '',
  category text default 'general', -- 'meeting_notes', 'proposal', 'guide', 'draft', 'general'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on documents
alter table public.documents enable row level security;

create policy "Users can only view their own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can create their own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "Users can delete their own documents"
  on public.documents for delete
  using (auth.uid() = user_id);


-- 4. AI Processing Jobs & Action Logs
create table if not exists public.ai_jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  raw_input text not null,
  extracted_summary text,
  suggested_tasks jsonb default '[]'::jsonb,
  status text default 'pending_approval', -- 'pending_approval', 'approved', 'dismissed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on ai_jobs
alter table public.ai_jobs enable row level security;

create policy "Users can view their own ai_jobs"
  on public.ai_jobs for select
  using (auth.uid() = user_id);

create policy "Users can create their own ai_jobs"
  on public.ai_jobs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own ai_jobs"
  on public.ai_jobs for update
  using (auth.uid() = user_id);
