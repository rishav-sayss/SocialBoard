import React, { createContext, ReactNode } from 'react'

export interface SocialContextType {
  // Global social configurations / helpers if needed
}

export const SocialContext = createContext<SocialContextType | undefined>(undefined)

export const SocialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return React.createElement(
    SocialContext.Provider,
    { value: {} },
    children
  )
}
