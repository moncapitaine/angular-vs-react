import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseDetailsPageComponent } from './analyse-details-page.component';

describe('AnalyseDetailsPageComponent', () => {
  let component: AnalyseDetailsPageComponent;
  let fixture: ComponentFixture<AnalyseDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
