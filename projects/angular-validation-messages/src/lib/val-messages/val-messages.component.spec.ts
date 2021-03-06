import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ValMessagesComponent } from './val-messages.component';
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { AngularValidationMessagesModule } from '../angular-validation-messages.module';
import { ValMessageComponent } from '../val-message/val-message.component';

describe('ValMessagesComponent', () => {
  describe('when the default display configuration is used', () => {
    @Component({
      template: `
        <form [formGroup]="formGroup">
          <val-messages [for]="control">
            <val-message default>A default validation message.</val-message>
          </val-messages>
          <button type="submit"></button>
        </form>`
    })
    class TestHostComponent {
      @ViewChild(ValMessagesComponent) validationMessageComponent: ValMessagesComponent;
      control: FormControl = new FormControl(null, [Validators.required]);
      formGroup: FormGroup = new FormGroup({
        myControl: this.control
      });

      touchControl() {
        this.control.markAsTouched();
      }
    }

    let component: ValMessagesComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule, ReactiveFormsModule],
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
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.detectChanges();

      expect(component.showErrors()).toEqual(true);
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
      configuration = getDefaultModuleConfigurationWithSpy(true);
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
      expect(configuration.validationMessages.displayWhen).toHaveBeenCalledWith(component.control, undefined);
    });
  });

  describe(`when the 'when' attribute is provided`, () => {
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

    let configuration: AngularValidationMessagesModuleConfiguration;
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
      configuration = getDefaultModuleConfigurationWithSpy(false);
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule.forRoot(configuration)],
        declarations: [TestHostComponent],
      });
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`it overrides the provided display configuration`, () => {
      expect(configuration.validationMessages.displayWhen).not.toHaveBeenCalled();
    });

    it('and it returns true, validation messages are shown', () => {
      component.touchControl();
      fixture.detectChanges();

      expect(component.validationMessageComponent.showErrors()).toEqual(true);
    });

    it('and it returns false, validation messages are not shown', () => {
      expect(component.validationMessageComponent.showErrors()).toEqual(false);
    });
  });

  describe(`when the 'for' attribute`, () => {
    @Component({
      template: `
        <div [formGroup]="formGroup">
          <val-messages>
            <val-message default>A default validation message.</val-message>
          </val-messages>
        </div>`
    })
    class TestHostComponent {
      @ViewChild(ValMessagesComponent) validationMessageComponent: ValMessagesComponent;
      control: FormControl = new FormControl(null, [Validators.required]);
      formGroup: FormGroup = new FormGroup({
        myControl: this.control
      });

      touchControl() {
        this.control.markAsTouched();
      }
    }

    let component: TestHostComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule, ReactiveFormsModule],
        declarations: [TestHostComponent]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      const fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('has an empty value passed to it, an exception is thrown', () => {
      expect(() => component.validationMessageComponent.for = undefined).toThrowError();
    });

    it('has a string passed to it, but a control by that name is not found, an exception is thrown', () => {
      expect(() => component.validationMessageComponent.for = 'test').toThrowError();
    });

    it('has a string passed to it, and a control is found, no exception is thrown', () => {
      expect(() => component.validationMessageComponent.for = 'myControl').not.toThrowError();
    });

    it('has a control passed to it, no exception is thrown', () => {
      expect(() => component.validationMessageComponent.for = component.control).not.toThrowError();
    });
  });

  describe('when a validation error occurs', () => {
    @Component({
      template: `
        <val-messages [for]="control" [when]="true">
          <val-message for="required">Input is required.</val-message>
          <val-message *ngIf="showDefault" default>A default validation message.</val-message>
        </val-messages>`
    })
    class TestHostComponent {
      @ViewChild(ValMessagesComponent) validationMessagesComponent: ValMessagesComponent;
      @ViewChildren(ValMessageComponent) validationMessageComponents: QueryList<ValMessageComponent>;
      control: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2)]);
      showDefault = true;
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule],
        declarations: [TestHostComponent]
      })
      .compileComponents();
    }));

    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`the validation message of the error's type is shown`, () => {
      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(1);
      visibleMessages[0].for = 'required';
    });

    it('and there is no validation message for it, the default validation message is shown', () => {
      component.control.setValue('a');

      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(1);
      expect(visibleMessages[0].default).toEqual(true);
    });

    it('and there is neither a message nor default for it, an exception is thrown', fakeAsync(() => {
      component.showDefault = false;
      fixture.detectChanges();
      component.control.setValue('a');

      expect(() => tick()).toThrowMatching(thrown => {
        return (thrown.message as string).includes(`There is no suitable 'val-message' element to show an error`);
      });
    }));

    it('and it is resolved, the validation message is no longer shown', () => {
      component.control.setValue('aa');

      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(0);
    });
  });

  describe(`when multiple validation errors occur, and the 'multiple' attribute`, () => {
    @Component({
      template: `
        <val-messages [for]="control" [when]="true" *ngIf="showNoMultiple">
          <val-message for="required"></val-message>
          <val-message for="required"></val-message>
          <val-message default></val-message>
        </val-messages>
        <val-messages [for]="control" [when]="true" *ngIf="showMultiple" multiple>
          <val-message for="required"></val-message>
          <val-message for="required"></val-message>
          <val-message default></val-message>
        </val-messages>
        <val-messages [for]="control" [when]="true" *ngIf="showMultipleDefault" multiple>
          <val-message for="minlength"></val-message>
          <val-message default></val-message>
          <val-message default></val-message>
        </val-messages>`
    })
    class TestHostComponent {
      @ViewChild(ValMessagesComponent) validationMessagesComponent: ValMessagesComponent;
      @ViewChildren(ValMessageComponent) validationMessageComponents: QueryList<ValMessageComponent>;
      control: FormControl = new FormControl(null, [Validators.required]);

      showNoMultiple = false;
      showMultiple = false;
      showMultipleDefault = false;
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AngularValidationMessagesModule],
        declarations: [TestHostComponent]
      })
      .compileComponents();
    }));

    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is not declared, the message first declared in the DOM of the template is shown', () => {
      component.showNoMultiple = true;
      fixture.detectChanges();

      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(1);
    });

    it('is declared, all related messages are shown', () => {
      component.showMultiple = true;
      fixture.detectChanges();

      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(2);
    });

    it('is declared, all default messages are shown when there are no related messages', () => {
      component.showMultipleDefault = true;
      fixture.detectChanges();

      const visibleMessages = component.validationMessageComponents.filter(x => x.show);
      expect(visibleMessages.length).toEqual(2);
      expect(visibleMessages.every(x => x.default)).toEqual(true);
    });
  });
});

function getDefaultModuleConfigurationWithSpy(returnValue: boolean) {
  const configuration: AngularValidationMessagesModuleConfiguration = {
    validationMessages: {
      displayWhen: () => returnValue
    }
  };

  spyOn(configuration.validationMessages, 'displayWhen').and.callThrough();

  return configuration;
}
