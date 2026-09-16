import React, { createContext, ReactNode } from 'react'
import { useAdmin as useAdminHook } from '../hooks/useAdmin'

export { useAdminHook as useAdmin }

export type AdminContextType = ReturnType<typeof useAdminHook>

export const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const adminState = useAdminHook()

  return React.createElement(
    AdminContext.Provider,
    { value: adminState },
    children
  )
}
