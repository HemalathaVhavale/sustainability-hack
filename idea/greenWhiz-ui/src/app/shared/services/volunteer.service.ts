import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../models/volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private httpClient: HttpClient) { }
  
  volunteer(postData: Volunteer): Observable<String> {
    return this.httpClient.post<String>(`https://greenWhiz.com/volunteer/`, postData)
  }
}