import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'avmd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {
  }

  title = 'angular-validation-messages-demo';

  form = this.fb.group({
    name: this.fb.group({
      firstName: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5)]],
      middleName: ['', [Validators.maxLength(50)]],
      lastName: ['', [Validators.required,
        Validators.maxLength(10 * 5)]]
    }),
    age: [null, [
      Validators.required,
      Validators.min(0),
      Validators.max(150)
    ]]
  });
}
