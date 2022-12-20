import { Injectable } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formStatus = new BehaviorSubject<{ status: FormControlStatus | undefined, isDirty: boolean}>({ status: undefined, isDirty: false})

  constructor() { }

  getFormStatus$() {
    return this.formStatus.asObservable()
  }

  changeFormStatus(status: FormControlStatus, isDirty: boolean) {
    console.log('change status to', {status, isDirty})
    this.formStatus.next({status, isDirty})
  }
}
