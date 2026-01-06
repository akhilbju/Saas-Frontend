import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsSettings } from './project-details-settings';

describe('ProjectDetailsSettings', () => {
  let component: ProjectDetailsSettings;
  let fixture: ComponentFixture<ProjectDetailsSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
