import { useFormContext } from "react-hook-form"
import { HaushaltsEinkommen } from "../../domain/analysis"

export interface IncomeFormProps {
  incomeData: HaushaltsEinkommen | undefined
}

export const IncomeForm: React.FC<IncomeFormProps> = ({incomeData}) => {
    const { register } = useFormContext<HaushaltsEinkommen>()

    console.log(incomeData)
    return (<>
      <label>
        <span>Brutto</span>
        <input {...register('gehaltBruttoMonatlich')} />
        {
          <div></div>
        }
        
      </label>
      <label>
        <span>Netto</span>
        <input {...register('gehaltNettoMonatlich')} />
      </label>
      <label>
        <span>Kapital</span>
        <input {...register('kapitalVermoegen')} />
      </label>
    </>)
}