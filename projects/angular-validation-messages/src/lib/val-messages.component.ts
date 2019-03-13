import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { getFormControlFromContainer } from './get-form-control-from-container';

@Component({
  selector: 'val-messages',
  template: `
    <p>
      angular-validation-messages works!
    </p>
  `,
  styles: []
})
export class ValMessagesComponent implements OnInit {
  _for: FormControl;

  constructor(@Optional() private controlContainer: ControlContainer) { }

  ngOnInit() {
  }

  @Input()
  set for(control: FormControl | string) {
    if (!control) {
      throw new Error(`The val-messages' for attribute requires a value.`);
    }

    this._for = typeof control === 'string' ? getFormControlFromContainer(control, this.controlContainer) : control;
  }
}
