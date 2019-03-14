import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValMessagesComponent } from './val-messages.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationMessagesConfiguration } from '../validation-messages-configuration';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { AngularValidationMessagesModule } from '../angular-validation-messages.module';
import { config } from 'rxjs';

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

  describe('when the default display configuration is used', () => {
    @Component({
      template: `
        <val-messages [for]="control">
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

    let component: ValMessagesComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule],
        declarations: [TestHostComponent],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance.validationMessageComponent;
      fixture.detectChanges();
    });

    it('and no control was touched, nor a form submitted, validation messages are not shown', () => {
      expect(component.showErrors()).toEqual(false);
    });

    it('and a control is touched, validation messages are shown', () => {
      fixture.componentInstance.touchControl();
      fixture.detectChanges();

      expect(component.showErrors()).toEqual(true);
    });

    it('and the form was submitted, validation messages are shown', () => {

    });
  });

  describe('when display configuration is provided', () => {
    @Component({
      template: `
        <val-messages [for]="control">
          <val-message default>A default validation message.</val-message>
        </val-messages>`
    })
    class TestHostComponent {
      control: FormControl = new FormControl(null, [Validators.required]);
    }

    let configuration: AngularValidationMessagesModuleConfiguration;
    let component: TestHostComponent;

    beforeEach(async(() => {
      configuration = getDefaultModuleConfigurationWithSpy();
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule.forRoot(configuration)],
        declarations: [TestHostComponent],
      });
    }));

    beforeEach(() => {
      const fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('it is used instead of the default', () => {
      expect(configuration.validationMessages.displayWhen).toHaveBeenCalled();
    });

    it('the control and form state are passed to it', () => {
      expect(configuration.validationMessages.displayWhen).toHaveBeenCalledWith(component.control, false);
    });
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

      const configuration = getDefaultModuleConfigurationWithSpy();
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
      expect(configuration.validationMessages.displayWhen).not.toHaveBeenCalled();
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

function getDefaultModuleConfigurationWithSpy() {
  const configuration: AngularValidationMessagesModuleConfiguration = {
    validationMessages: {
      displayWhen: (control, formSubmitted) => true
    }
  };

  spyOn(configuration.validationMessages, 'displayWhen').and.callThrough();

  return configuration;
}
