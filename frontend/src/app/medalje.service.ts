import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedaljeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiMedalje(){
    return this.http.get(`${this.uri}/medalje/dohvatiMedalje`);
  }

  dohvatiZemlju(zemlja){
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/medalje/dohvatiZemlju`, podaci);
  }

  napraviMedalju(ranking, zemlja, brojZlatnih, brojSrebrnih, brojBronzanih, ukupno){
    const podaci = {
      ranking: ranking,
      zemlja: zemlja,
      brojZlatnih: brojZlatnih,
      brojSrebrnih: brojSrebrnih,
      brojBronzanih: brojBronzanih,
      ukupno: ukupno
    }
    return this.http.post(`${this.uri}/medalje/napraviMedalju`, podaci);
  }

  azurirajZlatne(nacionalnost){
    console.log(nacionalnost);
    const podaci = {
      zemlja: nacionalnost
    }
    return this.http.post(`${this.uri}/medalje/azurirajZlatne`, podaci);
  }

  azurirajSrebrne(nacionalnost){
    console.log(nacionalnost);
    const podaci = {
      zemlja: nacionalnost
    }
    return this.http.post(`${this.uri}/medalje/azurirajSrebrne`, podaci);
  }

  azurirajBronzane(nacionalnost){
    console.log(nacionalnost);
    const podaci = {
      zemlja: nacionalnost
    }
    return this.http.post(`${this.uri}/medalje/azurirajBronzane`, podaci);
  }

  azurirajZemljiRang(zemlja, rang){
    const podaci = {
      zemlja: zemlja,
      rang: rang
    }
    return this.http.post(`${this.uri}/medalje/azurirajZemljiRang`, podaci);
  }

}
