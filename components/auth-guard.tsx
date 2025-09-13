"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        console.log('🔒 AuthGuard: Redirecting to login - user not authenticated')
        router.push("/auth/login")
      } else if (!requireAuth && user) {
        console.log('🔓 AuthGuard: Redirecting to dashboard - user already authenticated')
        router.push("/dashboard")
      }
    }
  }, [user, loading, requireAuth, router])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Don't render children if authentication is required but user is not authenticated
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Redirigiendo al login...</p>
        </div>
      </div>
    )
  }

  // Don't render children if authentication is not required but user is authenticated
  if (!requireAuth && user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  // Render children if authentication state matches requirements
  return <>{children}</>
}