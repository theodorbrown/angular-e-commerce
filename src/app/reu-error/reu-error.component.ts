import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-reu-error',
  templateUrl: './reu-error.component.html'
})
export class ReuErrorComponent {

  @Input() hasError: boolean | undefined = false;
  @Input() text: string = "";

}
