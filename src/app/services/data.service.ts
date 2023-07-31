import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nameData } from '../nameData';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(input:any): Observable<nameData[]>{
    console.log('Received input:', input);
    return this.http.get<nameData[]>('http://localhost:4200/data');
  } 
}