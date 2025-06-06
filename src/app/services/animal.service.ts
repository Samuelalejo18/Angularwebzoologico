import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  apiUri = '/api/getAnimals';
  apiUriPost = '/api/animalsPost';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllAnimalsData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

  newAnimal(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUriPost, data,
      { headers: this.httpOptions }
    )
  }
}
