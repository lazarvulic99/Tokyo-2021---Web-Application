import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportoviIdisciplineService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  strcasecmp(s1,s2): number{
    s1=(s1+'').toLowerCase();
    s2=(s2+'').toLowerCase();
    return s1>s2?1:(s1<s2?-1:0);
  }

  dohvatiSportove(){
    return this.http.get(`${this.uri}/sportoviIdiscipline/dohvatiSportove`);
  }

  dohvatiEkipneSportove(){
    return this.http.get(`${this.uri}/sportoviIdiscipline/dohvatiEkipneSportove`);
  }

  dohvatiDisciplineZaSport(sport){
    const podaci = {
      sport: sport
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiDisciplineZaSport`, podaci);
  }

  dohvatiEkipneDisciplineZaSport(sport){
    const podaci = {
      sport: sport,
      vrsta: 'e'
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiEkipneDisciplineZaSport`, podaci);
  }

  dohvatiDiscipline(){
    return this.http.get(`${this.uri}/sportoviIdiscipline/dohvatiDiscipline`);
  }

  dodajDisciplinu(idDis, sport, disciplina, vrsta, minIgraca, maxIgraca){
    const podaci = {
      idDis: idDis,
      sport: sport,
      disciplina: disciplina,
      vrsta: vrsta,
      minIgraca: minIgraca,
      maxIgraca: maxIgraca
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dodajDisciplinu`, podaci);
  }

  dodajFormat(traziSport, disciplinaUlepsana, ManjeVece, brRundi, format, minTakm, maxTakm){
    console.log(traziSport);
    console.log(disciplinaUlepsana);
    console.log(ManjeVece);
    console.log(brRundi);
    console.log(minTakm);
    console.log(maxTakm);
    const podaci = {
      sport: traziSport,
      disciplina: disciplinaUlepsana,
      ManjeVece: ManjeVece,
      brRundi: brRundi,
      format: format,
      min: minTakm,
      max: maxTakm
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dodajFormat`, podaci);
  }

  dohvatiFormatSporta(sportZaTakmicenje, disciplinaZaTakmicenje){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiFormatSporta`, podaci);
  }

  dohvatiTrazenuDisciplinu(sport, disciplina){
    const podaci = {
      sport: sport,
      disciplina: disciplina
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiTrazenuDisciplinu`, podaci);
  }

  azurirajSport(sport, broj){
    const podaci = {
      sport: sport,
      broj: broj
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/azurirajSport`, podaci);
  }

  proveriTipZaDisciplinu(sportZaTakmicenje,disciplinaZaTakmicenje){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/proveriTipZaDisciplinu`, podaci);
  }

  dodajSport(idSporta, sport, discipline){
    const podaci = {
      idSporta: idSporta,
      sport: sport,
      discipline: discipline
    }
    return this.http.post(`${this.uri}/sportoviIdiscipline/dodajSport`, podaci);
  }
}
