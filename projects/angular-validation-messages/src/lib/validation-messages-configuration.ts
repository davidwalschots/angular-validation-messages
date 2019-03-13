import { FormControl } from '@angular/forms';

export interface ValidationMessagesConfiguration {
  /**
   * Function to override the default validation message display behaviour with a different implementation.
   * The default returns true when the control is touched, or the form has been submitted.
   *
   * @param control The control for which to display errors
   * @param formSubmitted whether the form is submitted or not. When undefined, it's not known
   * if the form is submitted, due to the form tag missing a formGroup.
   */
  displayWhen: (control: FormControl, formSubmitted: boolean | undefined) => boolean;
}
