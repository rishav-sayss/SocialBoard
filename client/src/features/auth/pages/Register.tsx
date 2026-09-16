import React from 'react'
import { RegisterForm } from '../components/RegisterForm'

export const Register: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  )
}
