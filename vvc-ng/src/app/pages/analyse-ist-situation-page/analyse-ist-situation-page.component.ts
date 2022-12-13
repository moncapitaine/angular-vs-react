import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  myFormGroup: FormGroup

  constructor(route: ActivatedRoute, private situationService: IstSituationService) {
    this.paramMapSubscription = route.paramMap.subscribe(
      (paramMap) => this.analyseId = paramMap.get('id')
    )
    // do not work with snapshots, because will not work..
    this.analyseIdSnapshot = route.snapshot.paramMap.get('id')

    this.myFormGroup = new FormGroup({
      brutto: new FormControl(''),
      netto: new FormControl('', { validators: [Validators.required]}),
      assets: new FormControl('')
    })
  }

  onSubmit() {
    console.log('Submitting', this.myFormGroup.value)
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
      const income = situation.incomeMandant
      this.myFormGroup.patchValue(income)
      console.log(this.myFormGroup.value)
    })
  }
}
