import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';
import { Project } from './project/project';
import { ProjectDetails } from './project-details/project-details';
import { ProjectDetailsBoard } from './project-details-board/project-details-board';
import { ProjectDetailsSettings } from './project-details-settings/project-details-settings';
import { TaskDetails } from './task-details/task-details';

export const routes: Routes = [
    { path : 'login' ,component : Login ,canActivate: [AuthGuard] },
    { path : 'home' ,component : Home  , pathMatch: 'full' },
    { path : 'project' ,component : Project  , pathMatch: 'full' },
    {
        path: 'project-details/:projectId',
        component: ProjectDetails,
        children: [
          { path: '', redirectTo: 'board', pathMatch: 'full' },
          { path: 'board', component: ProjectDetailsBoard },
          { path: 'settings', component: ProjectDetailsSettings },
        ]
      },
    { path: 'task-details/:taskId', component: TaskDetails},    
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
