import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiFormat(sport, disciplina){
    const podaci = {
      sport: sport,
      disciplina: disciplina
    }
    return this.http.post(`${this.uri}/formati/dohvatiFormat`, podaci);
  }
}
