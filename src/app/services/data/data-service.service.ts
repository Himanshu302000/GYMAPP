import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GYM } from 'src/app/models/GYM';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }

  postData(obj:GYM)
  {
    return this.http.post<GYM>(`http://localhost:8080/postData`,obj);
  }
}
