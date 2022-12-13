import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnalysePageComponent } from './pages/analyse-page/analyse-page.component';
import { AnalyseIstSituationPageComponent } from './pages/analyse-ist-situation-page/analyse-ist-situation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    HomePageComponent,
    AnalysePageComponent,
    AnalyseIstSituationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
