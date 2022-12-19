import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnalysePageComponent } from './pages/analyse-page/analyse-page.component';
import { AnalyseIstSituationPageComponent } from './pages/analyse-ist-situation-page/analyse-ist-situation-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IstSituationFormComponent } from './components/ist-situation-form/ist-situation-form.component';
import { AnalyseDetailsPageComponent } from './pages/analyse-details-page/analyse-details-page.component';
import { CurrencyInputComponent } from './components/formControls/currency-input/currency-input.component';
import { DateInputComponent } from './components/formControls/date-input/date-input.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    HomePageComponent,
    AnalysePageComponent,
    AnalyseIstSituationPageComponent,
    IstSituationFormComponent,
    AnalyseDetailsPageComponent,
    CurrencyInputComponent,
    DateInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
