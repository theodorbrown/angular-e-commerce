import {AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmailCheckValidator} from "../register-form/validators/email-check";
import {regExpCheck} from "../register-form/validators/reg-exp-check";
import {comparePasswordsValidator} from "../register-form/validators/pwd-compare";
import {ImagesService} from "../services/images.service";
import {AuthService} from "../services/auth.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile-page',
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

  show5: boolean = true;
  show4: boolean = true;
  show6: boolean = true;
  show3: boolean = true;
  show2: boolean = true;
  show1: boolean = true;


  constructor(private fb: FormBuilder,
              private emailValidator: EmailCheckValidator,
              private imageService: ImagesService,
              private authService: AuthService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    //get current user
    //TODO : Unsubscribe on destroy
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

  get password() {
    return this.profileForm.get('password');
  }

  get confirm() {
    return this.profileForm.get('confirm');
  }

  get phonePrefix() {
    return this.profileForm.get('phone.prefix');
  }

  get phoneNumber() {
    return this.profileForm.get('phone.number');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get profileImage() {
    return this.profileForm.get('profileImage');
  }

  updateData() {
    console.log(this.profileForm.value)
  }
}
