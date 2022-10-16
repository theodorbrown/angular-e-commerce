import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const comparePasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirm');
  return password && confirm && password.value !== confirm.value ? {hasToMatch: true} : null;
}
