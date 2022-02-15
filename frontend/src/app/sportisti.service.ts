import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistiService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  traziSportiste(imeIPrezime, pol, zemlja, sport, disciplina, medalja){
    const podaci = {
      imeIPrezime: imeIPrezime,
      pol: pol,
      nacionalnost: zemlja,
      sport: sport,
      discipline: disciplina,
      medalja: medalja
    }
    return this.http.post(`${this.uri}/sportisti/traziSportiste`, podaci);
  }

  osvojioMedalju(idSportiste){
    const podaci = {
      idSportiste: idSportiste
    }
    return this.http.post(`${this.uri}/sportisti/osvojioMedalju`, podaci);
  }

  dohvatiMojeSportiste(zemlja){
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiMojeSportiste`, podaci);
  }

  dohvatiBrojTakmicaraZaSport(zemlja, sport){
    const podaci = {
      zemlja: zemlja,
      sport: sport
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiBrojTakmicaraZaSport`, podaci);
  }

  dohvatiPrijavljeneSportiste(polZaTakmicenje, sportZaTakmicenje, disciplinaZaTakmicenje){
    const podaci = {
      pol: polZaTakmicenje,
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiPrijavljeneSportiste`, podaci);
  }

  dohvatiPrijavljeneSportisteZaVodju(zemlja, polZaTakmicenje, sportZaTakmicenje, disciplinaZaTakmicenje){
    const podaci = {
      zemlja: zemlja,
      pol: polZaTakmicenje,
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiPrijavljeneSportisteZaVodju`, podaci);
  }

  dohvatiSportistu(idSportiste){
    const podaci={
      idSportiste: idSportiste
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiSportistu`, podaci);
  }

}
