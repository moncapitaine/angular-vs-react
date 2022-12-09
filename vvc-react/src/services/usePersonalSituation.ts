import { useState } from 'react'
import { emptyPersonalSituation, PersonalSituation } from '../domain/personalSituation'

export interface UsePersonalSituationResult {
  data: PersonalSituation
  saveData: (data: PersonalSituation) => void
}

export const usePersonalSituation = (
  analysisId: string | undefined,
): UsePersonalSituationResult => {
  const [data, saveData] = useState<PersonalSituation>(emptyPersonalSituation)
  return {
    data,
    saveData,
  }
}
