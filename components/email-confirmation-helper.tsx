'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

interface EmailConfirmationHelperProps {
  email: string
  onConfirmed?: () => void
}

export function EmailConfirmationHelper({ email, onConfirmed }: EmailConfirmationHelperProps) {
  const { resendConfirmation } = useAuth()
  const [isResending, setIsResending] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await resendConfirmation(email)
      
      if (error) {
        setResendStatus('error')
        setErrorMessage(error.message)
      } else {
        setResendStatus('success')
      }
    } catch (err) {
      setResendStatus('error')
      setErrorMessage('Error inesperado al reenviar email')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle>Confirma tu email</CardTitle>
        <CardDescription>
          Hemos enviado un enlace de confirmación a <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {resendStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ¡Email reenviado exitosamente! Revisa tu bandeja de entrada.
            </AlertDescription>
          </Alert>
        )}

        {resendStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button 
            onClick={handleResendEmail} 
            disabled={isResending}
            className="w-full"
            variant="outline"
          >
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Reenviando...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Reenviar email de confirmación
              </>
            )}
          </Button>

          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>¿No recibiste el email?</strong></p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Revisa tu carpeta de <strong>spam</strong> o <strong>correo no deseado</strong></li>
              <li>Espera unos minutos, puede tardar en llegar</li>
              <li>Si usas un email educativo (.edu.mx), puede estar bloqueado</li>
              <li>Intenta con un email personal (Gmail, Hotmail)</li>
            </ul>
          </div>

          {onConfirmed && (
            <Button 
              onClick={onConfirmed}
              className="w-full"
              variant="secondary"
            >
              Ya confirmé mi email
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
