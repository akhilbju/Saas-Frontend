import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';
import { Project } from './project/project';

export const routes: Routes = [
    { path : 'login' ,component : Login ,canActivate: [AuthGuard] },
    { path : 'home' ,component : Home  , pathMatch: 'full' },
    { path : 'project' ,component : Project  , pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
