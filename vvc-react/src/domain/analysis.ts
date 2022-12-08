export interface Analysis {
  id: number,
  mandant: {
    name: string,
    isSituation?: IstSituation
  },
  partner?: {
    name: string,
  }
}

export interface IstSituation {
  haushaltsEinkommenKunde?: HaushaltsEinkommen,
  haushaltsEinkommenPartner?: HaushaltsEinkommen,
}

export interface HaushaltsEinkommen {
  id?: number,
  gehaltBruttoMonatlich?: number,
  kapitalVermoegen?: number,
  gehaltNettoMonatlich?: number,
}