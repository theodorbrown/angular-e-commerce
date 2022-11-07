import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputComponent
      ),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  label!: string;

  @Input()
  parentForm!: FormGroup;

  @Input()
  fieldName!: string;

  @Input()
  inputType!: string;

  @Input()
  classes!: string;

  @Input()
  needLabel: boolean = true;

  get formField() {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  public value!: string;
  public changed!: (value: string) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: Event) {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }
}
