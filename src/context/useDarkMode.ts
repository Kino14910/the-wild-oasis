import { createContext, useContext } from 'react'

type DarkModeContextType = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export default function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider')
  return context
}
