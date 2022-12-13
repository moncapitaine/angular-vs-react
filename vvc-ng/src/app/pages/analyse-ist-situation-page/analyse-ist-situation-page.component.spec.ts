import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseIstSituationPageComponent } from './analyse-ist-situation-page.component';

describe('AnalyseIstSituationPageComponent', () => {
  let component: AnalyseIstSituationPageComponent;
  let fixture: ComponentFixture<AnalyseIstSituationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseIstSituationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseIstSituationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
