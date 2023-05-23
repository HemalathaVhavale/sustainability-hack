import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) { }
  
  signUp(postData: String): Observable<String> {
    return this.httpClient.post<String>(`https://greenWhiz.com/signUp/`, postData)
  }
}
