import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstSituationFormComponent } from './ist-situation-form.component';

describe('IstSituationFormComponent', () => {
  let component: IstSituationFormComponent;
  let fixture: ComponentFixture<IstSituationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstSituationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstSituationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
