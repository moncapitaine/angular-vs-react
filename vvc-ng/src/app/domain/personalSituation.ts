export interface PersonalSituation {
  incomeMandant: PersonalIncome
  incomePartner?: PersonalIncome
  ownerships: PersonalOwnership
}

export interface PersonalIncome {
  brutto?: number
  netto?: number
  assets?: number
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
  ownedSince?: string
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
  incomeMandant: {
    brutto: 12.55,
    netto: 13.99,
    assets: 0.99,
    employedSince: '27.10.1939'
  },
  incomePartner: {
    netto: 1.0
  },
  ownerships: {
    animals: [],
    companies: [],
    realEstates: [
      {
        id: '963',
        type: 'Mieter',
        remark: 'Alter Mieter',
        ownedSince: '21.03.2020',
      },
      {
        id: '964',
        type: 'Wohnungseigentum',
        remark: 'Neue WOhnung',
        ownedSince: '1.01.2020',
      },
    ],
    vehicles: [],
  },
}
