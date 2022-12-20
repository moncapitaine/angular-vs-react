export interface PersonalSituation {
  incomeMandant: PersonalIncome
  incomePartner?: PersonalIncome
  ownerships: PersonalOwnership
}

export interface PersonalIncome {
  brutto?: string
  netto?: string
  assets?: string
  employedSince?: string
}

export interface PersonalOwnership {
  realEstates: RealEstateOwnership[]
  vehicles: VehicleOwnership[]
  companies: CompanyOwnership[]
  animals: AnimalOwnership[]
}

export interface RealEstateOwnership {
  id?: string
  type: 'Wohnungseigentum' | 'Mieter'
  remark?: string
}

export interface VehicleOwnership {
  type: 'PKW' | 'Motorrad'
  remark?: string
}

export interface CompanyOwnership {
  companyName: string
  numberOfEmpployees: number
}

export interface AnimalOwnership {
  animalType: 'Hund' | 'Pferd'
  remark?: string
}

export const emptyPersonalSituation: PersonalSituation = {
  incomeMandant: {},
  incomePartner: {},
  ownerships: {
    animals: [],
    companies: [],
    realEstates: [
      {
        id: '963',
        type: 'Mieter',
        remark: 'Alter Mieter',
      },
    ],
    vehicles: [],
  },
}
