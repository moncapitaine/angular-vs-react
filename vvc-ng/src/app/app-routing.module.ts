import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseIstSituationPageComponent } from './pages/analyse-ist-situation-page/analyse-ist-situation-page.component';
import { AnalysePageComponent } from './pages/analyse-page/analyse-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'analyse', component: AnalysePageComponent
  },
  {
    path: 'analyse/:id', component: AnalyseIstSituationPageComponent
  },
  {
    path: '**', component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
