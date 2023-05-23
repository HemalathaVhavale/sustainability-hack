import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit{

  contactUsForm!: FormGroup;

  get firstname(): AbstractControl {
    return this.contactUsForm.get('firstName') as AbstractControl;
  }

  get lastname(): AbstractControl {
    return this.contactUsForm.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.contactUsForm.get('email') as AbstractControl;
  }

  get message(): AbstractControl {
    return this.contactUsForm.get('message') as AbstractControl;
  }

  constructor(private fb: FormBuilder, private service: ContactService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }
  
  contactUs(): void {
    this.service.contactUs(this.contactUsForm.value).subscribe(
      (data) => {
        this.toastr.success('Email notification has been sent successfully.', 'Success')   
      },
      (error) => {
        if (error.status !== 200) {
          this.toastr.error("Internal Server Error, Please try again later.", 'Warning');  
        }
      }
    )
  }
}