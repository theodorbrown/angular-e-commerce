import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {regExpCheck} from "../register-form/validators/reg-exp-check";
import {comparePasswordsValidator} from "../register-form/validators/pwd-compare";
import {EmailCheckValidator} from "../register-form/validators/email-check";
import {ImagesService} from "../services/images.service";
import {AuthService} from "../services/auth.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile-page-two',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidator],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.maxLength(25), regExpCheck]],
    confirm: ['', [Validators.required, Validators.maxLength(25)]],
    phone: this.fb.group({
      prefix: ['FR+33', Validators.required],
      number: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    }),
    age: ['', [Validators.required, Validators.min(18), Validators.max(119)]],
    profileImage: ['', [Validators.required]]
  }, {
    validators: comparePasswordsValidator
  })

  constructor(private fb: FormBuilder,
              private emailValidator: EmailCheckValidator,
              private imageService: ImagesService,
              private authService: AuthService,
              private usersService: UsersService){ }

  ngOnInit(): void {
    this.usersService.getUser().subscribe(user => {
      this.firstName?.setValue(user.firstName);
      this.lastName?.setValue(user.lastName);
      this.email?.setValue(user.email);
      this.age?.setValue(user.age);
      this.phoneNumber?.setValue(user.phone);
      this.profileImage?.setValue(user.profileImage);
    });
  }

  upload(file: HTMLInputElement) {
    if (file.files && file.files.length > 0) {
      const extractedFile = (file.files[0] as File);
      this.profileForm.get('profileImage')!.setValue(extractedFile.name);
      const formData = new FormData();
      formData.append('file', extractedFile)
      this.imageService.uploadFile(formData).subscribe(_ => this.authService.ls.next(true));
    }
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get age() {
    return this.profileForm.get('age');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get phoneNumber() {
    return this.profileForm.get('phone.number');
  }

  get profileImage() {
    return this.profileForm.get('profileImage');
  }
}
