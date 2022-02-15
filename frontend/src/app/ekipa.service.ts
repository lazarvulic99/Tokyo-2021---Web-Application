import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EkipaService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dodajEkipu(zemlja, traziSport, ekipnaDisciplina, ekipniPol, prijavljeniClanovi){
    const podaci = {
      sport: traziSport,
      disciplina: ekipnaDisciplina,
      pol: ekipniPol,
      zemlja: zemlja,
      clanovi: prijavljeniClanovi
    }
    return this.http.post(`${this.uri}/ekipe/dodajEkipu`, podaci);
  }

  pronadjiPostojecuEkipu(zemlja, traziSport, ekipnaDisciplina, ekipniPol){
    const podaci = {
      zemlja: zemlja,
      sport: traziSport,
      disciplina: ekipnaDisciplina,
      pol: ekipniPol
    }
    return this.http.post(`${this.uri}/ekipe/pronadjiPostojecuEkipu`, podaci);
  }
}
