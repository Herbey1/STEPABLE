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
    try {
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
      
      if (error) {
        console.warn('Sign up error:', error.message)
        
        // Manejar errores específicos
        if (error.message.includes('For security purposes')) {
          return { 
            data: null, 
            error: { 
              message: 'Por seguridad, espera unos segundos antes de intentar registrarte nuevamente.' 
            } 
          }
        } else if (error.message.includes('User already registered')) {
          return { 
            data: null, 
            error: { 
              message: 'Este email ya está registrado. Intenta iniciar sesión o usa otro email.' 
            } 
          }
        } else if (error.message.includes('Invalid email')) {
          return { 
            data: null, 
            error: { 
              message: 'El formato del email no es válido.' 
            } 
          }
        }
      }
      
      // Si el registro fue exitoso pero el email no está confirmado
      if (data.user && !data.user.email_confirmed_at) {
        console.log('📧 Usuario registrado, email de confirmación enviado')
        return { 
          data, 
          error: null,
          message: '¡Registro exitoso! Revisa tu email para confirmar tu cuenta.'
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('Sign up error:', err)
      return { 
        data: null, 
        error: { 
          message: 'Error de conexión. Por favor, verifica tu conexión a internet.' 
        } 
      }
    }
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

  const resendConfirmation = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })
      
      if (error) {
        console.warn('Resend confirmation error:', error.message)
        
        if (error.message.includes('For security purposes')) {
          return { 
            data: null, 
            error: { 
              message: 'Por seguridad, espera unos segundos antes de solicitar otro email.' 
            } 
          }
        } else if (error.message.includes('Email rate limit exceeded')) {
          return { 
            data: null, 
            error: { 
              message: 'Has solicitado demasiados emails. Espera unos minutos antes de intentar nuevamente.' 
            } 
          }
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('Resend confirmation error:', err)
      return { 
        data: null, 
        error: { 
          message: 'Error al reenviar email. Intenta nuevamente más tarde.' 
        } 
      }
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendConfirmation,
  }
}
