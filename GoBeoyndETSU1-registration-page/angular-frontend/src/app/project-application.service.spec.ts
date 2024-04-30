import { TestBed } from '@angular/core/testing';

import { ProjectApplicationService } from './project-application.service';

describe('ProjectApplicationService', () => {
  let service: ProjectApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
