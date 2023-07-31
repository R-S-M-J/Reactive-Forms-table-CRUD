import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { vehicleD } from '../vehicleInforData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5000/data'

  constructor(private http:HttpClient) { }

  getVData(input:any):Observable<vehicleD[]>{
    console.log('received input: ',input);
    return this.http.get<vehicleD[]>(this.apiUrl);
  }

  addTask(task:vehicleD):Observable<vehicleD>{
    return this.http.post<vehicleD>(this.apiUrl, task, httpOptions);
  }

}
