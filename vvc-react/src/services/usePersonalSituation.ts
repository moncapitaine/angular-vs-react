import { emptyPersonalSituation, PersonalSituation } from '../domain/personalSituation'
import { useLocalStorage } from './useLocalStorage'

export interface UsePersonalSituationResult {
  data: PersonalSituation
  saveData: (data: PersonalSituation) => void
}

export const usePersonalSituation = (
  analysisId: string | undefined,
): UsePersonalSituationResult => {
  const [data, setData] = useLocalStorage<PersonalSituation>('personalSituation', emptyPersonalSituation)

  const saveData = (data: PersonalSituation) => {
    // deep compare...todo
    setData((oldData) => ({...oldData, ...data}))
  }

  return {
    data,
    saveData,
  }
}
