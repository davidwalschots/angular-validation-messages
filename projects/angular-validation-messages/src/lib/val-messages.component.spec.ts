import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValMessagesComponent } from './val-messages.component';

describe('ValMessagesComponent', () => {
  let component: ValMessagesComponent;
  let fixture: ComponentFixture<ValMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when no display configuration is provided, a default setting is used', () => {
    fail('Not implemented yet.');
  });

  it('when display configuration is provided, it is used instead of the default', () => {
    fail('Not implemented yet.');
  });

  describe(`when the 'on' attribute is provided`, () => {
    it(`it overrides the global display configuration`, () => {
      fail('Not implemented yet.');
    });

    it('the component is shown when the expression returns true', () => {
      fail('Not implemented yet.');
    });

    it('the component is not shown when the expression returns false', () => {
      fail('Not implemented yet.');
    });
  });

  describe(`when the 'for' attribute`, () => {
    it('is not set, an exception is thrown', () => {
      fail('Not implemented yet.');
    });

    it('has a string passed to it, but a control by that name is not found, an exception is thrown', () => {
      fail('Not implemented yet.');
    });

    it('has a string passed to it, but a parent FormGroup is not found, an exception is thrown', () => {
      fail('Not implemented yet.');
    });
  });

  describe('when a validation error occurs', () => {
    it(`the validation message of the error's type is shown`, () => {
      fail('Not implemented yet.');
    });

    it('and there is no validation message for it, the default validation message is shown', () => {
      fail('Not implemented yet.');
    });

    it('and there is neither a message nor default for it, an exception is thrown', () => {
      fail('Not implemented yet.');
    });
  });
});
