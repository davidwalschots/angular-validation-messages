import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { AngularValidationMessagesModuleConfigurationToken } from '../angular-validation-messages-module-configuration-token';
import { AngularValidationMessagesModuleConfiguration } from '../angular-validation-messages-module-configuration';
import { getFormControlFromContainer } from '../get-form-control-from-container';
import { ValidationMessagesConfiguration } from '../validation-messages-configuration';

@Component({
  selector: 'val-messages',
  templateUrl: './val-messages.component.html',
  styles: []
})
export class ValMessagesComponent implements OnInit {
  _for: FormControl;

  constructor(@Optional() private controlContainer: ControlContainer,
    @Optional() @Inject(AngularValidationMessagesModuleConfigurationToken)
    private configuration: AngularValidationMessagesModuleConfiguration) { }

  ngOnInit() {
  }

  @Input()
  set for(control: FormControl | string) {
    if (!control) {
      throw new Error(`The val-messages' for attribute requires a value.`);
    }

    this._for = typeof control === 'string' ? getFormControlFromContainer(control, this.controlContainer) : control;
  }

  showErrors() {
    // TODO: Implement form submitted.
    return this.getConfiguration().displayWhen(this._for, false);
  }

  private getConfiguration(): ValidationMessagesConfiguration {
    return this.configuration.validationMessages;
  }
}
