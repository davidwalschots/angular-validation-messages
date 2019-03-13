import { TestBed } from '@angular/core/testing';

import { AngularValidationMessagesService } from './angular-validation-messages.service';

describe('AngularValidationMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularValidationMessagesService = TestBed.get(AngularValidationMessagesService);
    expect(service).toBeTruthy();
  });
});
