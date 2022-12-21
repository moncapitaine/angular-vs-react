import { useContext, useEffect, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PersonalSituation } from '../../domain/personalSituation'
import { NavigationContext } from '../../services/navigationContext'
import { DateInput } from '../controls/dateInput'
import { MoneyInput } from '../controls/moneyInput'
import { ListItemRemark } from './listItemRemark'

export interface PersonalSituationFormProps {
  data: PersonalSituation
  saveData: (data: PersonalSituation) => void
}

export const PersonalSituationForm: React.FC<PersonalSituationFormProps> = ({ data, saveData }) => {
  const navigate = useNavigate()
  const [navigationPath, setNavigationPath] = useState<string | undefined>()
  const [showPopup, setShowPopup] = useState(false)
  const { setNavigationChecker, setContextIsDirty } = useContext(NavigationContext)

  const { control, register, handleSubmit, reset, formState } = useForm<PersonalSituation>({
    defaultValues: data,
    mode: 'all',
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

  const onSubmit = (data: PersonalSituation) => {
    console.log('submitted, ... will save', data)
    saveData(data)
    reset(data)
  }

  useEffect(() => {
    setContextIsDirty(formState.isDirty)
    setNavigationChecker((path) => {
      if (!formState.isDirty) {
        return true
      }
      setShowPopup(true)
      setNavigationPath(path)
      return false
    })
  }, [formState.isDirty])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showPopup && (
        <div>
          Popup
          <button onClick={() => setShowPopup(false)}>Close</button>
          <button
            onClick={() => {
              navigationPath && navigate(navigationPath)
            }}
          >
            Verwerfen
          </button>
          <button
            onClick={() => {
              handleSubmit(onSubmit)()
              navigationPath && navigate(navigationPath)
            }}
          >
            Speichern
          </button>
        </div>
      )}
      {formState.isSubmitted && !formState.isValid && (
        <div>
          <>
          <h3>Fehler aufgetreten</h3>
          {console.log(formState)}
          </>
        </div>
      )}
      <article>
        <h3>Mandant</h3>
        {/* Todo: extract component */}
        <label>
          <span>Brutto</span>
          <MoneyInput {...register('incomeMandant.brutto')} />
        </label>
        <label>
          <span>Netto</span>
          <MoneyInput {...register('incomeMandant.netto', { required: true })} />
        </label>
        <label>
          <span>Kapital</span>
          <MoneyInput {...register('incomeMandant.assets')} />
        </label>
        <label>
          <span>Angestellt seit</span>
          <DateInput {...register('incomeMandant.employedSince')} />
        </label>
      </article>

      {data.incomePartner && (
        <article>
          <h3>Partner</h3>
          <label>
            <span>Brutto</span>
            <MoneyInput {...register('incomePartner.brutto')} />
          </label>
          <label>
            <span>Netto</span>
            <MoneyInput {...register('incomePartner.netto')} />
          </label>
          <Controller
            control={control}
            name='incomeMandant.assets'
            render={({ field }) => <p>{field.value}</p>}
          />
          <label>
            <span>Kapital</span>
            <MoneyInput {...register('incomePartner.assets')} />
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
                <option value='Mieter'>Mieter</option>
                <option value='Pächter'>Pächter</option>
              </select>
              <ListItemRemark {...register(`ownerships.realEstates.${index}.remark`)} />
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
