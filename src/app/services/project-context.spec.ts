import { TestBed } from '@angular/core/testing';

import { ProjectContext } from './project-context';

describe('ProjectContext', () => {
  let service: ProjectContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
