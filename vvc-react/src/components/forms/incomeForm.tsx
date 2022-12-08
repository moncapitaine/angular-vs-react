import { useForm } from 'react-hook-form'
import { HaushaltsEinkommen } from '../../domain/analysis'

export interface IncomeFormProps {
  incomeData: HaushaltsEinkommen | undefined
}

export const IncomeForm: React.FC<IncomeFormProps> = ({ incomeData }) => {
  const { register, handleSubmit } = useForm<HaushaltsEinkommen>({
    defaultValues: incomeData,
    mode: 'onBlur',
  })
  const onSubmit = (data: HaushaltsEinkommen) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Brutto</span>
        <input {...register('gehaltBruttoMonatlich')} />
      </label>
      <label>
        <span>Netto</span>
        <input {...register('gehaltNettoMonatlich')} />
      </label>
      <label>
        <span>Kapital</span>
        <input {...register('kapitalVermoegen')} />
      </label>
    </form>
  )
}
