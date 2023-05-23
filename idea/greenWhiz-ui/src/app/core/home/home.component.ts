import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignUpService } from 'src/app/shared/services/sign-up.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  signUpForm!: FormGroup;

  get email(): AbstractControl {
    return this.signUpForm.get('email') as AbstractControl;
  }

  constructor(private fb: FormBuilder, private service: SignUpService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email]]
    });
  }
  
  signUp(): void {
    this.service.signUp(this.email.value).subscribe(
      (data) => {
        this.toastr.success('SignUp is success. Email notification has been sent successfully.', 'Success')   
      },
      (error) => {
        if (error.status !== 200) {
          this.toastr.error("Internal Server Error, Please try again later.", 'Warning');  
        }
      }
    )
  }
}
