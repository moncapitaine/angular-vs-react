import { Link } from 'react-router-dom'

export const AnalysisHomePage = () => {
  return (
    <ul>
      <li>
        <Link to='/analyse/4711'>Agnes Abel (4711)</Link>
      </li>
      <li>
        <Link to='/analyse/4712'>Max Muster (4712)</Link>
      </li>
    </ul>
  )
}
