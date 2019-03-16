import { Component, OnInit, Input, Optional, Inject, OnDestroy, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { AngularValidationMessagesModuleConfigurationToken } from '../angular-validation-messages-module-configuration-token';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { getFormControlFromContainer } from '../get-form-control-from-container';
import { ValidationMessagesConfiguration } from '../validation-messages-configuration';
import { FormDirective, getControlPath } from 'angular-validation-support';
import { Subscription } from 'rxjs';
import { ValMessageComponent } from '../val-message/val-message.component';
import { coerceBooleanProperty } from '../coerce-boolean-property';

@Component({
  selector: 'val-messages',
  templateUrl: './val-messages.component.html',
  styles: []
})
export class ValMessagesComponent implements OnInit, AfterContentInit, OnDestroy {
  private defaultConfiguration: ValidationMessagesConfiguration = {
    displayWhen: (control, formSubmitted) => !!(control.touched || formSubmitted)
  };
  private formSubmitted: boolean | undefined = undefined;
  private formSubmittedSubscription: Subscription;
  private forStatusChangeSubscription: Subscription;
  private _isMultiple = false;

  @ContentChildren(ValMessageComponent) validationMessageComponents: QueryList<ValMessageComponent>;
  _for: FormControl;
  _displayWhen: boolean | undefined;

  constructor(@Optional() private controlContainer: ControlContainer,
    @Optional() @Inject(AngularValidationMessagesModuleConfigurationToken)
    private configuration: AngularValidationMessagesModuleConfiguration,
    @Optional() formSubmitDirective: FormDirective) {
      if (formSubmitDirective) {
        this.formSubmitted = false;
        this.formSubmittedSubscription = formSubmitDirective.submitted.subscribe(() => {
          this.formSubmitted = true;
        });
      }
    }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this._for) {
      this.handleControlStatusChange(this._for);
    }
  }

  ngOnDestroy() {
    if (this.formSubmittedSubscription) {
      this.formSubmittedSubscription.unsubscribe();
    }
  }

  @Input()
  set for(control: FormControl | string) {
    if (this.forStatusChangeSubscription) {
      this.forStatusChangeSubscription.unsubscribe();
    }

    if (!control) {
      throw new Error(`The val-messages' for attribute requires a value.`);
    }

    this._for = typeof control === 'string' ? getFormControlFromContainer(control, this.controlContainer) : control;

    if (this._for) {
      this.forStatusChangeSubscription = this._for.statusChanges.subscribe(() => this.handleControlStatusChange(this._for));
      this.handleControlStatusChange(this._for);
    }
  }

  @Input()
  get multiple() {
    return this._isMultiple;
  }
  set multiple(value: any) {
    this._isMultiple = coerceBooleanProperty(value);
  }

  @Input()
  set when(display: boolean) {
    this._displayWhen = typeof display === 'boolean' ? display : undefined;
  }

  showErrors() {
    if (this._displayWhen !== undefined) {
      return this._displayWhen;
    }

    if (this._for === undefined) {
      return false;
    }

    return this.getConfiguration().displayWhen(this._for, this.formSubmitted);
  }

  private getConfiguration(): ValidationMessagesConfiguration {
    if (this.configuration && this.configuration.validationMessages) {
      return this.configuration.validationMessages;
    }

    return this.defaultConfiguration;
  }

  private handleControlStatusChange(control: FormControl) {
    if (!this.validationMessageComponents) {
      return;
    }

    this.hideAllMessageComponents();

    if (!control.errors) {
      return;
    }

    this.pickAndShowMessageComponents(control);
  }

  private hideAllMessageComponents() {
    this.validationMessageComponents.forEach(x => x.show = false);
  }

  private pickAndShowMessageComponents(control: FormControl) {
    const nonDefaultMessageComponents = this.validationMessageComponents.filter(x => x.canShow(control.errors) && !x.default);
    const defaultMessageComponents = this.validationMessageComponents.filter(x => x.canShow(control.errors) && x.default);

    if (nonDefaultMessageComponents.length > 0) {
      this.showMessageComponents(nonDefaultMessageComponents);
    } else if (defaultMessageComponents.length > 0) {
      this.showMessageComponents(defaultMessageComponents);
    } else {
      const controlPath = getControlPath(control);
      throw new Error(`There is no suitable 'val-message' element to show an error`
        + (controlPath.length > 0 ? ` of ${controlPath}` : '') + '.');
    }
  }

  private showMessageComponents(components: ValMessageComponent[]) {
    for (let i = 0; i < components.length && (i < 1 || this._isMultiple); i++) {
      components[i].show = true;
    }
  }
}
