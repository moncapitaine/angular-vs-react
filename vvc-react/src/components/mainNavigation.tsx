import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavigationContext } from '../services/navigationContext'

export const MainNavigation = () => {
  const navigate = useNavigate()
  const { contextIsDirty, navigationChecker } = useContext(NavigationContext)

  return (
    <ul>
      <li>contextIsDirty {contextIsDirty ? 'dirty' : 'clean'}</li>
      <li>
        <a
          href='#'
          onClick={(event) => {
            event.preventDefault()
            if (navigationChecker('/analyse')) {
              navigate('/analyse')
            }
          }}
        >
          Navi 1
        </a>
      </li>
      <li><a href="#" onClick={() => {
        console.log('click')
      }}>Check test</a></li>
    </ul>
  )
}
