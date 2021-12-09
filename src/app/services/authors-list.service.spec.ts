import { TestBed } from '@angular/core/testing';

import { AuthorsListService } from './authors-list.service';

describe('AuthorsListService', () => {
  let service: AuthorsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
