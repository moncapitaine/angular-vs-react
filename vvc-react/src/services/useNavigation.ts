import { useParams, useNavigate } from 'react-router-dom'

export interface UseNavigationProps {
  checkNavigation: () => boolean
}

export const useNavigation = ({checkNavigation}: UseNavigationProps) => {
  const { id } = useParams()
  const routerNavigate = useNavigate()

  return { id, navigate: (route: string) => {
    if (checkNavigation()) {
      routerNavigate(route)
    }
  }}
}