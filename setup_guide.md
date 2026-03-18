# Project Setup Guide

Follow these steps to set up the profile project locally.

## 1. Prerequisites
- Node.js or Bun installed.
- A Supabase account and project.

## 2. Environment Variables
Create a `.env` file in the root directory (if it doesn't exist) and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Database Schema
Run the following SQL in your Supabase SQL Editor to create the `blogs` table and enable RLS:

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  cover_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public Read Access" ON blogs 
FOR SELECT USING (is_published = true);

-- Allow authenticated users to manage posts (or adjust based on your needs)
CREATE POLICY "Allow Full Access for Authenticated Users" ON blogs 
FOR ALL TO authenticated USING (true);
```

## 4. Storage Setup
Run the following command to create the `blog-images` bucket:
```bash
node setup_storage.js
```
*Note: Ensure you have set up RLS for storage as mentioned in the script output.*

## 5. Seed Initial Data
To populate the blog with sample posts:
```bash
node seed_blog.js
```

## 6. Run the Project
```bash
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.
