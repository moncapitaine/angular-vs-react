import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AnalyseDetailsPageComponent } from './pages/analyse-details-page/analyse-details-page.component';
import { AnalyseIstSituationPageComponent } from './pages/analyse-ist-situation-page/analyse-ist-situation-page.component';
import { AnalysePageComponent } from './pages/analyse-page/analyse-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormService } from './services/form.service';

@Injectable({
  providedIn: 'root'
})
class CanNavigate implements CanActivate {
  constructor(private formService: FormService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.formService.getFormStatus$()
      .pipe(take(1))
      .pipe(map(currentStatus => {
        const canNavigate = currentStatus.status !== 'INVALID' && currentStatus.status !== 'PENDING' && !currentStatus.isDirty
        if (!canNavigate) {
          this.formService.navigateCancelled()
        } else {
          this.formService.navigateStatusReset()
        }
        return canNavigate
        }
      ))
  }
}

const routes: Routes = [
  {
    path: 'analyse',
    component: AnalysePageComponent,
    canActivate: [CanNavigate]
  },
  {
    path: 'analyse/:id/istSituation',
    component: AnalyseIstSituationPageComponent,
    canActivate: [CanNavigate]
  },
  {
    path: 'analyse/:id',
    component: AnalyseDetailsPageComponent,
    canActivate: [CanNavigate]
  },

  {
    path: '**',
    component: HomePageComponent,
    canActivate: [CanNavigate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
