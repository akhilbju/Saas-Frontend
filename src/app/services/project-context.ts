import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectApiModel } from '../models/getprojects.response';

@Injectable({
  providedIn: 'root'
})
export class ProjectContextService {

  private projectSource =
    new BehaviorSubject<ProjectApiModel | null>(null);

  project$ = this.projectSource.asObservable();

  setProject(project: ProjectApiModel) {
    this.projectSource.next(project);
  }

  getProject(): ProjectApiModel | null {
    return this.projectSource.value;
  }

  clear() {
    this.projectSource.next(null);
  }
}
