import { useForm, FormProvider } from "react-hook-form"
import { useParams } from "react-router-dom"
import { IncomeForm } from "../components/forms/incomeForm"
import { Analysis } from "../domain/analysis"
import { useLoadAnalysis } from "../services/analysisService"

export const AnalysisIstSituationPage = () => {
  const { id } = useParams()
  const analysis = useLoadAnalysis(id)
  const methods = useForm<Partial<Analysis>>({
    defaultValues: analysis ?? {}
  })

  if (!analysis) {
    return (<div>loading...</div>)
  }

  const onSubmit = (data: Partial<Analysis>) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}><h2>Ist Situation fuer {id}</h2>
        <article>
          <h2>Einkommen Kunde</h2>
          <IncomeForm incomeData={analysis.mandant.isSituation?.haushaltsEinkommenKunde} />
        </article>
        {analysis.partner && (<article>
          <h2>Einkommen Partner</h2>
          <IncomeForm incomeData={analysis.mandant.isSituation?.haushaltsEinkommenPartner} />
        </article>)}

      </form>
    </FormProvider>)
}