import { useBestandsdatenSucheQuery } from './useBestandsdatenSucheQuery'

export const useBestandsdatenChangeCheck = (id: string) => {
  const bestandsDaten = useBestandsdatenSucheQuery(id)
  // const aktuelleDaten = useAnalyseLadeQuery(id)


  return {
    bestandsDaten // , aktuelleDaten //, delta
  }
}