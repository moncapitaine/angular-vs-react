import { Injectable } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formStatus = new BehaviorSubject<{ status: FormControlStatus | undefined, isDirty: boolean}>({ status: undefined, isDirty: false})
  private navigateStatus = new BehaviorSubject<'cancelled' | undefined>(undefined)
  constructor() {}

  getFormStatus$() {
    return this.formStatus.asObservable()
  }

  getNavigateStatus$() {
    return this.navigateStatus.asObservable()
  }

  changeFormStatus(status: FormControlStatus, isDirty: boolean) {
    console.log('change status to', {status, isDirty})
    this.formStatus.next({status, isDirty})
  }

  navigateCancelled() {
    console.log('navigate cancelled')
    this.navigateStatus.next('cancelled')
  }

  navigateStatusReset() {
    this.navigateStatus.next(undefined)
  }
}
