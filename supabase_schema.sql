-- Create clients table
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  company text,
  email text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create invoices table
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  client_id uuid references public.clients on delete cascade not null,
  invoice_number text not null,
  amount numeric not null,
  status text not null, -- 'due_soon', 'overdue', 'promised', 'disputed', 'paid'
  due_date date not null,
  description text,
  platform text default 'STRIPE',
  cadence text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.clients enable row level security;
alter table public.invoices enable row level security;

-- Create policies so users can only see their own data
create policy "Users can view their own clients"
  on public.clients for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own clients"
  on public.clients for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own clients"
  on public.clients for update
  using ( auth.uid() = user_id );

create policy "Users can view their own invoices"
  on public.invoices for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own invoices"
  on public.invoices for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own invoices"
  on public.invoices for update
  using ( auth.uid() = user_id );

-- Create profiles table for Settings
create table public.profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  agency_name text default 'My Agency',
  admin_name text,
  contact_email text,
  stripe_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = user_id );
