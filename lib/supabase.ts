import { createClient } from '@supabase/supabase-js'

// Fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cldwxejwgcsbiysujzwu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZHd4ZWp3Z2NzYml5c3Vqend1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjE5NDcsImV4cCI6MjA3MzMzNzk0N30.qZCPdEWn1prgfu--BTKweh7cbOY1iM18aH11vHZ225xs'

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Para desarrollo, permitir usuarios sin confirmar email
    flowType: 'pkce',
    // Configuración adicional para desarrollo
    debug: process.env.NODE_ENV === 'development'
  }
})

// Test connection and log status
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.warn('⚠️ Supabase connection issue:', error.message)
    console.log('💡 Please check your Supabase project configuration')
  } else {
    console.log('✅ Supabase connected successfully')
  }
}).catch(err => {
  console.warn('⚠️ Supabase initialization error:', err.message)
})

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  language: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description?: string
  github_repo?: string
  project_type?: string
  status: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface ProjectMember {
  id: string
  project_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  joined_at: string
}

export interface Module {
  id: string
  project_id: string
  name: string
  description?: string
  order_index: number
  status: 'draft' | 'published'
  estimated_time?: string
  difficulty: string
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  description?: string
  content?: string
  type: 'reading' | 'practice' | 'quiz'
  order_index: number
  duration?: string
  status: 'draft' | 'published'
  quiz_data?: any
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  score?: number
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  project_id: string
  title: string
  description?: string
  file_type?: 'markdown' | 'pdf' | 'template'
  content?: string
  file_url?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Integration {
  id: string
  project_id: string
  type: string
  config?: any
  is_active: boolean
  created_at: string
  updated_at: string
}
