import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Error getting session:', error.message)
      }
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: {
    firstName: string
    lastName: string
    company: string
    role: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: `${userData.firstName} ${userData.lastName}`,
          company: userData.company,
          role: userData.role,
        }
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.warn('Login error:', error.message)
        
        // Manejar error de email no confirmado
        if (error.message.includes('Email not confirmed')) {
          return { 
            data: null, 
            error: { 
              message: 'Por favor, revisa tu email y confirma tu cuenta antes de iniciar sesión.' 
            } 
          }
        }
        
        // For demo purposes, allow demo credentials even with API key issues
        if (email === 'demo@stepable.com' && password === 'demo123') {
          return { 
            data: { 
              user: { 
                id: 'demo-user', 
                email: 'demo@stepable.com',
                user_metadata: { name: 'Demo User' }
              } 
            }, 
            error: null 
          }
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('Sign in error:', err)
      return { data: null, error: { message: 'Error de conexión. Por favor, verifica tu conexión a internet.' } }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
