import './App.css'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { AnalysisHomePage } from './pages/analysisHomePage'
import { AnalysisMandantPage } from './pages/analysisMandantPage'

const router = createBrowserRouter([
  {
    path: '/analyse/:id',
    element: <AnalysisMandantPage />,
  },
  {
    path: '/analyse',
    element: <AnalysisHomePage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
])

function App() {
  return (
    <>
      <header>
        Header
        <nav>Navigation</nav>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
