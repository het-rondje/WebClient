import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { PublicKeysComponent } from './components/public-keys/public-keys.component';

import { AuthGuard } from './guards/auth.guard';
import { Profile } from 'selenium-webdriver/firefox';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'keys', component: PublicKeysComponent },
  {path:  'profile/:id',component:ProfileComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  //{ path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
