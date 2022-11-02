import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-toggle-profile-info',
  templateUrl: './toggle-profile-info.component.html'
})
export class ToggleProfileInfoComponent implements OnInit {

  constructor() {
  }

  @Input()
  form!: FormGroup;

  @Input()
  prop!: string;

  ngOnInit(): void {
  }

  toggleClasses(text: HTMLSpanElement, input: HTMLSpanElement, anchor: HTMLAnchorElement) {
    text.classList.toggle('hidden');
    input.classList.toggle('hidden');
    anchor.classList.toggle('hidden')
  }

  setInputType(prop: string): string {
    switch (prop) {
      case 'email': {
        return 'email'
      }
      case 'password': {
        return 'password'
      }
      case 'age': {
        return 'number'
      }
      default: {
        return 'text'
      }
    }
  }

  disableButtonStatus(prop: string): boolean {
    return prop === 'password' ? this.form.get(prop)!.errors || this.form.get('confirm')!.errors || this.form.errors?.['hasToMatch'] : this.form.get(prop)!.errors
  }
}
