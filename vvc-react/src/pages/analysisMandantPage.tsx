import { Link, useParams } from 'react-router-dom'
import { useLoadAnalysis } from '../services/analysisService'

export const AnalysisMandantPage = () => {
  const { id } = useParams()
  const analysis = useLoadAnalysis(id)

  return (
    <>
      {!analysis && <div>loading...</div>}
      {analysis && (
        <>
          <h2>
            Analyse für {analysis.mandant.name} ({analysis.id})
          </h2>
          <Link to='/analyse/9876/istSituation'>{analysis.id} Ist Situation</Link>
        </>
      )}
    </>
  )
}
