import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LokacijeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiLokacije(){
    return this.http.get(`${this.uri}/lokacije/dohvatiLokacije`);
  }
}
