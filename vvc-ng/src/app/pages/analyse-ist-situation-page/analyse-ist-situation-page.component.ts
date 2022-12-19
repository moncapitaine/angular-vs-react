import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  myFormGroup!: FormGroup
  realEstates!: FormArray
  vehicles!: FormArray
  companies!: FormArray
  animals!: FormArray

  constructor(
    route: ActivatedRoute,
    private fb: FormBuilder,
    private situationService: IstSituationService) {
    this.paramMapSubscription = route.paramMap.subscribe(
      (paramMap) => this.analyseId = paramMap.get('id')
    )
    // do not work with snapshots, because will not work..
    this.analyseIdSnapshot = route.snapshot.paramMap.get('id')
    this.createForm()
  }

  createForm() {
    this.realEstates = this.fb.array([]),
    this.vehicles = this.fb.array([]),
    this.companies = this.fb.array([]),
    this.animals = this.fb.array([]),

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
        realEstates: this.realEstates,
        vehicles: this.vehicles,
        companies: this.companies,
        animals: this.animals,
      })
    })
  }
  onSubmit() {
    console.log('checking errors', this.myFormGroup.errors)
    console.log('Submitting', this.myFormGroup?.value)
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    this.paramMapSubscription.unsubscribe()
    this.situationSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    
    console.log('ngOnInit')
    this.situationSubscription = this.situationService.getIstSituation$().subscribe((situation) => {
      console.log('patchValue', situation)
      // check why the ownership is not in the formgroup
      this.myFormGroup?.patchValue(situation)
      console.log(this.myFormGroup?.value)
    })
  }
}
