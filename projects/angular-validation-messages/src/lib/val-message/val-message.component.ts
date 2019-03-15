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
  @Input()
  for: string;
  show = false;

  canShow(errors: ValidationErrors): boolean {
    return true;
  }
}
