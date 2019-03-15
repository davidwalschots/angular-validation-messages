import { Component, OnInit, Input, Optional, Inject, OnDestroy, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { AngularValidationMessagesModuleConfigurationToken } from '../angular-validation-messages-module-configuration-token';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { getFormControlFromContainer } from '../get-form-control-from-container';
import { ValidationMessagesConfiguration } from '../validation-messages-configuration';
import { FormDirective } from 'angular-validation-support';
import { Subscription } from 'rxjs';
import { ValMessageComponent } from '../val-message/val-message.component';

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
      this.forStatusChangeSubscription = this._for.statusChanges.subscribe(x => this.handleControlStatusChange(x));
      this.handleControlStatusChange(this._for);
    }
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

    this.validationMessageComponents.forEach(x => x.show = false);

    const messageComponents = this.validationMessageComponents.filter(x => x.canShow(control.errors));
    messageComponents[0].show = true;
  }
}
