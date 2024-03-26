import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  const valid = hasNumber && hasLetter;

  return valid ? null : { invalidPassword: true };
}
