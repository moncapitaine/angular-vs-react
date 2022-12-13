import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { AnalysisHomePage } from './pages/analysisHomePage'
import { AnalysisMandantPage } from './pages/analysisMandantPage'
import { AnalysisIstSituationPage } from './pages/analysisIstSituationPage'
import { MainNavigation } from './components/mainNavigation'
import { NavigationContext } from './services/navigationContext'
import { useState } from 'react'

const defaultNavigate = () => true

function App() {
  const [contextIsDirty, setContextIsDirty] = useState(false)
  const [navigationChecker, setNavigationCheckerInternal] = useState<(path: string) => boolean>(
    () => defaultNavigate,
  )

  return (
    <BrowserRouter>
      <NavigationContext.Provider
        value={{
          contextIsDirty,
          setContextIsDirty,
          setNavigationChecker: (checker) => setNavigationCheckerInternal(() => checker),
          navigationChecker,
        }}
      >
        <header>
          Header
          <nav>
            <MainNavigation />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/analyse/:id/istSituation' element={<AnalysisIstSituationPage />} />
            <Route path='/analyse/:id' element={<AnalysisMandantPage />} />
            <Route path='/analyse' element={<AnalysisHomePage />} />
            <Route path='/Home' element={<HomePage />} />
          </Routes>
        </main>
        <footer>Footer</footer>
      </NavigationContext.Provider>
    </BrowserRouter>
  )
}

export default App
