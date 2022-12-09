import { useForm, useFieldArray } from 'react-hook-form'
import { PersonalSituation } from '../../domain/personalSituation'

export interface PersonalSituationFormProps {
  data: PersonalSituation
}

export const PersonalSituationForm: React.FC<PersonalSituationFormProps> = ({ data }) => {
  const { control, register, handleSubmit, formState } = useForm<PersonalSituation>({
    defaultValues: data,
    mode: 'onBlur',
  })

  const {
    fields: realEstateFields,
    append: realEstateAppend,
    remove: realEstateRemove,
  } = useFieldArray({ control, name: 'ownerships.realEstates' })
  const {
    fields: animalFields,
    append: animalAppend,
    remove: animalRemove,
  } = useFieldArray({ control, name: 'ownerships.animals' })

  const onSubmit = (data: PersonalSituation) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formState.isSubmitted && !formState.isValid && (
        <div>
          <h3>Fehler aufgetreten</h3>
        </div>
      )}
      <article>
        <h3>Mandant</h3>
        {/* Todo: extract component */}
        <label>
          <span>Brutto</span>
          <input {...register('incomeMandant.brutto')} />
        </label>
        <label>
          <span>Netto</span>
          <input {...register('incomeMandant.netto', { required: true })} />
        </label>
        <label>
          <span>Kapital</span>
          <input {...register('incomeMandant.assets')} />
        </label>
      </article>

      {data.incomePartner && (
        <article>
          <h3>Partner</h3>
          <label>
            <span>Brutto</span>
            <input {...register('incomePartner.brutto')} />
          </label>
          <label>
            <span>Netto</span>
            <input {...register('incomePartner.netto')} />
          </label>
          <label>
            <span>Kapital</span>
            <input {...register('incomePartner.assets')} />
          </label>
        </article>
      )}
      <article>
        <h3>Eigentum / Umfeld</h3>
        <ul>
          {realEstateFields.map((field, index) => (
            <li key={field.id}>
              <select {...register(`ownerships.realEstates.${index}.type`)}>
                <option value='Wohnungseigentum'>Wohnungseigentum</option>
                <option value='Miete'>Miete</option>
              </select>
              <label>
                Bemerkung
                <input {...register(`ownerships.realEstates.${index}.remark`)} />
              </label>
              <button onClick={() => realEstateRemove(index)}>Entfernen</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => realEstateAppend({ type: 'Mieter', remark: 'Hier Bemerkung eingeben' })}
        >
          Real Estate Ownership hinzufügen
        </button>
      </article>
      <input type='submit' value='Submit' />
    </form>
  )
}
