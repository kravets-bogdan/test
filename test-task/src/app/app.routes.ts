import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './components/page-forbidden/page-forbidden.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', title: 'Home Page', component: HomeComponent },
  { path: '403', component: PageForbiddenComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
