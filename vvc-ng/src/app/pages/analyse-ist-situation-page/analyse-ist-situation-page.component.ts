import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimalOwnership, RealEstateOwnership } from 'src/app/domain/personalSituation';
import { FormService } from 'src/app/services/form.service';
import { IstSituationService } from 'src/app/services/ist-situation.service';

@Component({
  selector: 'app-analyse-ist-situation-page',
  templateUrl: './analyse-ist-situation-page.component.html',
  styleUrls: ['./analyse-ist-situation-page.component.css']
})
export class AnalyseIstSituationPageComponent implements OnInit, OnDestroy {
  analyseId?: string | null
  analyseIdSnapshot: string | null
  paramMapSubscription: Subscription
  situationSubscription?: Subscription
  formStatusSubscription?: Subscription
  navigateStatusSubscription?: Subscription
  myFormGroup!: FormGroup
  navigateWasCancelled = false

  constructor(
    route: ActivatedRoute,
    private fb: FormBuilder,
    private formService: FormService,
    private situationService: IstSituationService) {
    this.paramMapSubscription = route.paramMap.subscribe(
      (paramMap) => this.analyseId = paramMap.get('id')
    )
    // do not work with snapshots, because will not work..
    this.analyseIdSnapshot = route.snapshot.paramMap.get('id')
    this.createForm()
  }

  get realEstates() {
    return this.myFormGroup.get('ownerships.realEstates') as FormArray
  }

  get vehicles() {
    return this.myFormGroup.get('ownerships.vehicles') as FormArray
  }

  get companies() {
    return this.myFormGroup.get('ownerships.companies') as FormArray
  }

  get animals() {
    return this.myFormGroup.get('ownerships.animals') as FormArray
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      incomeMandant: this.fb.group({
        brutto: [],
        netto: ['', { validators: [Validators.required]}],
        assets: [],
        employedSince: ['', { validators: [Validators.required]}]
      }),
      incomePartner: this.fb.group({
        brutto: [],
        netto: ['', { validators: [Validators.required]}],
        assets: []
      }),
      ownerships: this.fb.group({
        realEstates: this.fb.array([]),
        vehicles: this.fb.array([]),
        companies: this.fb.array([]),
        animals: this.fb.array([]),
      })
    })
  }

  addRealEstate(item: RealEstateOwnership) {
    this.realEstates.push(this.fb.group({
      id: [item.id],
      type: [item.type],
      remark: [item.remark],
      ownedSince: [item.ownedSince]
    }))
  }

  removeRealEstate(index: number) {
    this.realEstates.removeAt(index)
  }

  addAnimals(item: AnimalOwnership) {
    this.animals.push(this.fb.group({
      animalType: [item.animalType],
      remark: [item.remark],
    }))
  }

  onSubmit() {
    console.log('checking errors', this.myFormGroup.errors)
    console.log('Submitting', this.myFormGroup?.value)
    this.myFormGroup.markAsPristine()
    this.formService.changeFormStatus(this.myFormGroup.status, this.myFormGroup.dirty)
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe()
    this.situationSubscription?.unsubscribe()
    this.formStatusSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.situationSubscription = this.situationService.getIstSituation$().subscribe((situation) => {
      this.myFormGroup?.patchValue(situation)
      situation.ownerships.realEstates.forEach(item => this.addRealEstate(item))
      situation.ownerships.animals.forEach(item => this.addAnimals(item))
    })

    this.formStatusSubscription = this.myFormGroup.statusChanges.subscribe(status => {
      this.formService.changeFormStatus(status, this.myFormGroup.dirty)
    })

    this.navigateStatusSubscription = this.formService.getNavigateStatus$().subscribe(status => {
      if (status === 'cancelled') {
        this.navigateWasCancelled = true
      }
    })
  }
}
