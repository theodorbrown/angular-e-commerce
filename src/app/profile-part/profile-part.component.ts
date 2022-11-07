import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile-part',
  templateUrl: './profile-part.component.html'
})
export class ProfilePartComponent implements OnInit {
  onSwitch: boolean = false;

  @Input()
  parentForm!: FormGroup;

  @Input()
  fieldName!: string;

  @Input()
  label!: string;

  @Input()
  inputType!: string

  @Input()
  gray: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  get formField() {
    return this.parentForm.get(this.fieldName);
  }

  updateUser(fieldName: string, value: string | number) {
    this.usersService.updateUser({
      [fieldName]: value
    }).subscribe();
  }
}
