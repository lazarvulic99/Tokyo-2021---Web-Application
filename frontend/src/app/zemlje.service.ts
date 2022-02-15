import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiZemlje(){
    return this.http.get(`${this.uri}/zemlje/dohvatiZemlje`);
  }

  povecajBrojSportista(nacionalnost){
    const podaci = {
      zemlja: nacionalnost
    }
    return this.http.post(`${this.uri}/zemlje/povecajBrojSportista`, podaci);
  }
}
