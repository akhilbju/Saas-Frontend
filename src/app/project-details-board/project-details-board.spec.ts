import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsBoard } from './project-details-board';

describe('ProjectDetailsBoard', () => {
  let component: ProjectDetailsBoard;
  let fixture: ComponentFixture<ProjectDetailsBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
