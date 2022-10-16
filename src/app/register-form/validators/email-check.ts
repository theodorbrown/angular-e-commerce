import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {UsersService} from "../../services/users.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class EmailCheckValidator implements AsyncValidator {
  constructor(private userService: UsersService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.userExist(control.value).pipe(
      map(emailExist => (emailExist ? { emailExist: true } : null)),
      catchError(() => of(null))
    );
  }
}
