import React from 'react'
import { LoginForm } from '../components/LoginForm'

export const Login: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  )
}
