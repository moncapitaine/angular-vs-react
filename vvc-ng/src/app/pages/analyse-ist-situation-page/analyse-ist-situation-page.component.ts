import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analyse-ist-situation-page',
  templateUrl: './analyse-ist-situation-page.component.html',
  styleUrls: ['./analyse-ist-situation-page.component.css']
})
export class AnalyseIstSituationPageComponent implements OnInit, OnDestroy {
  analyseId?: string | null
  analyseIdSnapshot: string | null
  paramMapSubscription: Subscription

  constructor(route: ActivatedRoute) {
    this.paramMapSubscription = route.paramMap.subscribe(
      (paramMap) => this.analyseId = paramMap.get('id')
    )
    this.analyseIdSnapshot = route.snapshot.paramMap.get('id')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    this.paramMapSubscription.unsubscribe()
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }
}
