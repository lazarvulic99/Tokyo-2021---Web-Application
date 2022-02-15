import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RekordiService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiSveRekorde(pol){
    const podaci = {
      pol: pol
    }
    return this.http.post(`${this.uri}/rekordi/dohvatiSveRekorde`, podaci);
  }
}
