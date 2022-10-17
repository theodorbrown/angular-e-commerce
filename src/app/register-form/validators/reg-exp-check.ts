import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const regExpCheck: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    interface Err {
      has2up?: boolean,
      hasSymbol?: boolean,
      has2Digit?: boolean,
      has3Lo?: boolean,
      is8Long?: boolean
    }

    let errors: Err = {
      has2up: true,
      hasSymbol: true,
      has2Digit: true,
      has3Lo: true,
      is8Long: true
    };

    const has2Up: RegExp = new RegExp('[A-Z].*[A-Z]');
    const res = has2Up.test(control.value);
    if (res)
      delete errors.has2up;

    const hasSymbol: RegExp = new RegExp('[!@#$&*]');
    const res2 = hasSymbol.test(control.value);
    if (res2)
      delete errors.hasSymbol;

    const has2Digit: RegExp = new RegExp('[0-9].*[0-9]');
    const res3 = has2Digit.test(control.value);
    if (res3)
      delete errors.has2Digit;

    const has3Lo: RegExp = new RegExp('[a-z].*[a-z].*[a-z]');
    const res4 = has3Lo.test(control.value);
    if (res4)
      delete errors.has3Lo;

    const is8Long: RegExp = new RegExp('.{8}');
    const res5 = is8Long.test(control.value);
    if (res5)
      delete errors.is8Long;

    return errors;
}
