import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path : 'login' ,component : Login ,canActivate: [AuthGuard] },
    { path : 'home' ,component : Home  , pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
