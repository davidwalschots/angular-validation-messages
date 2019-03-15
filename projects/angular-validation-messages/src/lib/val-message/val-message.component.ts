import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
    this._isDefault = this.coerceBooleanProperty(value);
  }

  canShow(errors: ValidationErrors): boolean {
    return this._isDefault || errors.hasOwnProperty(this.for);
  }

  private  coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }
}
