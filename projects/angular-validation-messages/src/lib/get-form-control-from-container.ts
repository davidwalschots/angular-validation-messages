// TODO: Extract into package from angular-reactive-validation to reuse in both projects.
import { FormGroup, FormControl, ControlContainer } from '@angular/forms';

export function getFormControlFromContainer(name: string, controlContainer: ControlContainer | undefined): FormControl {
  if (controlContainer) {
    const control = (<FormGroup>controlContainer.control).controls[name];
    if (!control) {
      throw new Error(`There is no control named '${name}'` +
        (getPath(controlContainer).length > 0 ? ` within '${getPath(controlContainer).join('.')}'` : '') + '.');
    }
    if (!(control instanceof FormControl)) {
      throw new Error(`The control named '${name}' ` +
        (getPath(controlContainer).length > 0 ? `within '${getPath(controlContainer).join('.')}' ` : '') +
        `is not a FormControl. Maybe you accidentally referenced a FormGroup or FormArray?`);
    }

    return control;
  } else {
    throw new Error(`You can't pass a string to the 'for' attribute, when the ` +
      `element is not a child of an element with a formGroupName or formGroup declaration.`);
  }
}

function getPath(controlContainer: ControlContainer): string[] {
  return controlContainer.path || [];
}
