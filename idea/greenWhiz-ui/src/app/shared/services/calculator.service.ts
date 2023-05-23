import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calculate } from '../models/calculator';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private countryListApiUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  getAllCountries() {
    return this.httpClient.get(`${this.countryListApiUrl}/all`);
  }

  calculate(postData: Calculate): Observable<Array<Calculate>> {
    return this.httpClient.post<Array<Calculate>>(
      `http://localhost:8085/calculate/`,
      postData
    );
  }
}
