import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjaService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiTakmicenje(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje
    }
    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenje`, podaci);
  }

  dohvatiFormiranaTakmicenja(){
    return this.http.get(`${this.uri}/takmicenja/dohvatiFormiranaTakmicenja`);
  }

  proveriPreklapanja(datumPocetka, vremePocetka){
    const podaci = {
      datumPocetka: datumPocetka,
      vremePocetka: vremePocetka
    }
    return this.http.post(`${this.uri}/takmicenja/proveriPreklapanja`, podaci);
  }

  dohvatiDelegatovaTakmicenja(mojDelegat){
    const podaci = {
      imeDelegata: mojDelegat
    }
    return this.http.post(`${this.uri}/takmicenja/dohvatiDelegatovaTakmicenja`, podaci);
  }

  dohvatiSvaTakmicenja(){
    return this.http.get(`${this.uri}/takmicenja/dohvatiSvaTakmicenja`);
  }

  proveriDaLiJeFormirano(sport, disciplina, pol){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/takmicenja/proveriDaLiJeFormirano`, podaci);
  }

  formirajTakm(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje
    }
    return this.http.post(`${this.uri}/takmicenja/formirajTakm`, podaci);
  }

  azurirajTakmicenje(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje, datumPocetka, datumKraja, lokacijeZaTakmicenje, format){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje,
      datumPocetka: datumPocetka,
      datumKraja: datumKraja,
      lokacije: lokacijeZaTakmicenje,
      format: format
    }
    return this.http.post(`${this.uri}/takmicenja/azurirajTakmicenje`, podaci);
  }

  dodajDatumIVreme(sport, disciplina, pol, tip, datumPocetka, vremePocetka){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      tip: tip,
      datumPocetka: datumPocetka,
      vremePocetka: vremePocetka
    }
    return this.http.post(`${this.uri}/takmicenja/dodajDatumIVreme`, podaci);
  }

  dodajTakmicenje(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje, datumPocetka, datumKraja, lokacijeZaTakmicenje, format, delegatiNiz, sportistiNiz, formirano){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje,
      datumPocetka: datumPocetka,
      datumKraja: datumKraja,
      lokacije: lokacijeZaTakmicenje,
      format: format,
      delegati: delegatiNiz,
      takmicari: sportistiNiz,
      vremePocetka: "",
      vremeKraja: "",
      formirano: formirano
    }
    return this.http.post(`${this.uri}/takmicenja/dodajTakmicenje`, podaci);
  }

  dodajDelegate(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje, delegatiNiz){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje,
      delegati: delegatiNiz
    }
    return this.http.post(`${this.uri}/takmicenja/dodajDelegate`, podaci);
  }

  dodajSportiste(sportZaTakmicenje, disciplinaZaTakmicenje, polZaTakmicenje, vrstaZaTakmicenje, sportistiNiz){
    const podaci = {
      sport: sportZaTakmicenje,
      disciplina: disciplinaZaTakmicenje,
      pol: polZaTakmicenje,
      tip: vrstaZaTakmicenje,
      sportisti: sportistiNiz
    }
    return this.http.post(`${this.uri}/takmicenja/dodajSportiste`, podaci);
  }

  dohvatiBrojJavljanjaDelegata(delegat){
    const podaci = {
      delegat: delegat
    }
    return this.http.post(`${this.uri}/takmicenja/dohvatiBrojJavljanjaDelegata`, podaci);
  }
}
