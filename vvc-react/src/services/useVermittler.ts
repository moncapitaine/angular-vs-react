import { useEffect, useState } from 'react'
import { Vermittler } from '../domain/vermittler'

export const useCurrentVermittler = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [vermittler, setVermittler] = useState<Vermittler | undefined>()
  const [error, setError] = useState<string | undefined>()

  useEffect( () => {
    setIsLoading(true)
    fetch('https://vermittler.com/current').then(async (data) => {
      const vermittlerData = await data.json()
      setVermittler(vermittlerData)
    }).catch((error) => setError(error))
    .finally(() => setIsLoading(false)
    )
  }, [])

  return { isLoading, vermittler, error }
}