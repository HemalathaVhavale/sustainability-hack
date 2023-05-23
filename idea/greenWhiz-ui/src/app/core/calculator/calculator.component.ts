import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Calculate } from 'src/app/shared/models/calculator';
import { CalculatorService } from 'src/app/shared/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  disable: boolean = false;
  countries: any;
  httpMethods: any[] = ['POST', 'PUT', 'GET', 'DELETE'];
  entry: any;
  entries: any = [];
  postData: Calculate = {
    request: [{ url: '', method: '', queryParams: '', output: '' }],
    serverLocation: '',
    appLocation: '',
  };

  constructor(
    private service: CalculatorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countries = data;
      this.countries.sort((a: any, b: any) =>
        a.name.common > b.name.common ? 1 : -1
      );
    });

    this.entry = { url: '', method: '', queryParams: '', output: '' };
    this.entries.push(this.entry);
  }

  addRow() {
    this.entry = { url: '', method: '', queryParams: '', output: '' };
    this.entries.push(this.entry);
    this.toastr.success('New row added successfully', 'New Row');
    return true;
  }

  deleteRow(index: any) {
    if (this.entries.length === 1) {
      this.toastr.error(
        "Can't delete the row when there is only one row",
        'Warning'
      );
      return false;
    } else {
      this.entries.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  submit(): void {
    this.postData.request = this.entries;
    this.service.calculate(this.postData).subscribe(
      (data) => {
        this.entries = data;
        this.disable = true;
        this.toastr.success('Carbon Footprint has been calculated.', 'Success');
      },
      (error) => {
        if (error.status !== 200) {
          this.disable = false;
          this.toastr.error(
            'Internal Server Error, Please try again later.',
            'Warning'
          );
        }
      }
    );
  }

  serverLocationchange(country: string): void {
    this.postData.serverLocation = country;
  }

  appLocationchange(country: string): void {
    this.postData.appLocation = country;
  }
}
