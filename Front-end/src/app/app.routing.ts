import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Profile } from 'selenium-webdriver/firefox';


const appRoutes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
    { path: 'progile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);