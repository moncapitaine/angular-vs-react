import { createContext } from 'react'

export interface NavigationContextProps {
  contextIsDirty: boolean
  setContextIsDirty: (dirty: boolean) => void
  setNavigationChecker: (navigateFunc: (path: string)=> boolean) => void
  navigationChecker: (path: string) => boolean
}

export const NavigationContext = createContext<NavigationContextProps>({
  contextIsDirty: false,
  setContextIsDirty: () => null,
  setNavigationChecker: () => null,
  navigationChecker: () => true
})
