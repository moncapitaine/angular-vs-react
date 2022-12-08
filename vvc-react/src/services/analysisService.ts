import { useEffect, useState } from "react";
import { Analysis } from "../domain/analysis";

export const loadAnalysis = async (analysisId: number): Promise<Analysis> => {
  const result = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  const json = await result.json()
  return json as Analysis
}

export const useLoadAnalysis = (id: string | undefined) => {
  const [analysis, setAnalysis] = useState<Analysis | undefined>()
  useEffect(() => {
    if (!id) {
      return
    }
    loadAnalysis(+id).then((analysis) => setAnalysis({ id: +id, name: `Name von ${analysis.name}`}))
  }, [id])

  if (!id) {
    return null;
  }

  return analysis
}