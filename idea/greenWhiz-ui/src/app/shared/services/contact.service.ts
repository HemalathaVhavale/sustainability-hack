import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUs } from '../models/contactUs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
  
  contactUs(postData: ContactUs): Observable<String> {
    return this.httpClient.post<String>(`https://greenWhiz.com/contactUs/`, postData)
  }
}
