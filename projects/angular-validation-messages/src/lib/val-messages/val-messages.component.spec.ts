import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValMessagesComponent } from './val-messages.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationMessagesConfiguration } from '../validation-messages-configuration';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { AngularValidationMessagesModule } from '../angular-validation-messages.module';

describe('ValMessagesComponent', () => {
  // let component: ValMessagesComponent;
  // let fixture: ComponentFixture<ValMessagesComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ValMessagesComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ValMessagesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('when no display configuration is provided, a default setting is used', () => {

  });

  it('when display configuration is provided, it is used instead of the default', () => {
    @Component({
      template: `
        <val-messages [for]="firstNameControl">
          <val-message default>A default validation message.</val-message>
        </val-messages>`
    })
    class TestHostComponent {
      firstNameControl: FormControl = new FormControl(null, [Validators.required]);
    }

    const validationMessagesConfiguration: ValidationMessagesConfiguration = {
      displayWhen: (control, formSubmitted) => true
    };
    const configuration: AngularValidationMessagesModuleConfiguration = {
      validationMessages: validationMessagesConfiguration
    };

    spyOn(validationMessagesConfiguration, 'displayWhen').and.callThrough();

    TestBed.configureTestingModule({
      imports: [AngularValidationMessagesModule.forRoot(configuration)],
      declarations: [TestHostComponent],
    });

    const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);

    expect(validationMessagesConfiguration.displayWhen).not.toHaveBeenCalled();
    fixture.detectChanges();
    expect(validationMessagesConfiguration.displayWhen).toHaveBeenCalled();
  });

  describe(`when the 'when' attribute is provided`, () => {
    it(`it overrides the global display configuration`, () => {
      @Component({
        template: `
          <val-messages [for]="control" [when]="control.touched">
            <val-message default>A default validation message.</val-message>
          </val-messages>`
      })
      class TestHostComponent {
        @ViewChild(ValMessagesComponent) validationMessageComponent: ValMessagesComponent;
        control: FormControl = new FormControl(null, [Validators.required]);

        touchControl() {
          this.control.markAsTouched();
        }
      }

      const validationMessagesConfiguration: ValidationMessagesConfiguration = {
        displayWhen: (control, formSubmitted) => true
      };
      const configuration: AngularValidationMessagesModuleConfiguration = {
        validationMessages: validationMessagesConfiguration
      };

      spyOn(validationMessagesConfiguration, 'displayWhen').and.callThrough();

      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule.forRoot(configuration)],
        declarations: [TestHostComponent],
      });

      const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);

      fixture.detectChanges();
      expect(fixture.componentInstance.validationMessageComponent.showErrors()).toEqual(false);

      fixture.componentInstance.touchControl();
      fixture.detectChanges();

      expect(fixture.componentInstance.validationMessageComponent.showErrors()).toEqual(true);
      expect(validationMessagesConfiguration.displayWhen).not.toHaveBeenCalled();
    });

    it('the component is shown when the expression returns true', () => {

    });

    it('the component is not shown when the expression returns false', () => {

    });
  });

  describe(`when the 'for' attribute`, () => {
    it('is not set, an exception is thrown', () => {

    });

    it('has a string passed to it, but a control by that name is not found, an exception is thrown', () => {

    });

    it('has a string passed to it, but a parent FormGroup is not found, an exception is thrown', () => {

    });
  });

  describe('when a validation error occurs', () => {
    it(`the validation message of the error's type is shown`, () => {

    });

    it('and there is no validation message for it, the default validation message is shown', () => {

    });

    it('and there is neither a message nor default for it, an exception is thrown', () => {

    });
  });

  describe(`when multiple validation errors occur, and the 'multiple' attribute`, () => {
    it('is not declared, the first message that occurs in the template is shown', () => {

    });

    it('is declared, all related messages are shown', () => {

    });

    it('is declared, and multiple messages go to the default, only one default message is shown', () => {

    });
  });
});
