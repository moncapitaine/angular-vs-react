import { useState } from 'react'
import { emptyPersonalSituation, PersonalSituation } from '../domain/personalSituation'

export interface UsePersonalSituationResult {
  data: PersonalSituation
  saveData: (data: PersonalSituation) => void
}

export const usePersonalSituation = (
  analysisId: string | undefined,
): UsePersonalSituationResult => {
  const [data, setData] = useState<PersonalSituation>(emptyPersonalSituation)

  const saveData = (data: PersonalSituation) => {
    // deep compare...todo
    setData((oldData) => ({...oldData, ...data}))
  }

  return {
    data,
    saveData,
  }
}
