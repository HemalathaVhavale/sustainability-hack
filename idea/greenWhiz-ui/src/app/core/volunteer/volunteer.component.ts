import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VolunteerService } from 'src/app/shared/services/volunteer.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit{

  volunteerForm!: FormGroup;

  get firstname(): AbstractControl {
    return this.volunteerForm.get('firstName') as AbstractControl;
  }

  get lastname(): AbstractControl {
    return this.volunteerForm.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.volunteerForm.get('email') as AbstractControl;
  }

  get contact(): AbstractControl {
    return this.volunteerForm.get('message') as AbstractControl;
  }

  get message(): AbstractControl {
    return this.volunteerForm.get('message') as AbstractControl;
  }

  constructor(private fb: FormBuilder, private service: VolunteerService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.volunteerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
  
  volunteer(): void {
    this.service.volunteer(this.volunteerForm.value).subscribe(
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
