import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { coerceBooleanProperty } from '../coerce-boolean-property';

@Component({
  selector: 'val-message',
  template: `
    <p>
      angular-validation-messages works!
    </p>
  `,
  styles: []
})
export class ValMessageComponent {
  private _isDefault = false;

  @Input()
  for: string;
  show = false;

  @Input()
  get default() {
    return this._isDefault;
  }
  set default(value: any) {
    this._isDefault = coerceBooleanProperty(value);
  }

  canShow(errors: ValidationErrors): boolean {
    return this._isDefault || errors.hasOwnProperty(this.for);
  }
}
