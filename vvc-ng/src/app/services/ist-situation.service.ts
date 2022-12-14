import { Injectable } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { emptyPersonalSituation } from '../domain/personalSituation';

@Injectable({
  providedIn: 'root'
})
export class IstSituationService {

  private personalSituationSubject = new BehaviorSubject(emptyPersonalSituation)
  constructor() { }

  getIstSituation$() {
    return this.personalSituationSubject.asObservable()
  }


}
