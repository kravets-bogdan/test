import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './modules/page-forbidden/page-forbidden.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  { path: '', title: 'Home Page', component: HomeComponent },
  { path: '403', component: PageForbiddenComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
