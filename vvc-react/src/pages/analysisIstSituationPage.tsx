import { useParams } from 'react-router-dom'
import { PersonalSituationForm } from '../components/personalSituationForm/personalSituationForm'
import { usePersonalSituation } from '../services/usePersonalSituation'

export const AnalysisIstSituationPage = () => {
  const { id } = useParams()
  const { data, saveData } = usePersonalSituation(id)

  if (!data) {
    return <div>Personal Situation loading...</div>
  }

  return (
    <section>
      <h2>Persönliche Situation fuer {id}</h2>
      <PersonalSituationForm data={data} />
      <div>
        <button>Speichern</button>
        <button>Verwerfen</button>
        <button>Zum Kunden</button>
      </div>
    </section>
  )
}
