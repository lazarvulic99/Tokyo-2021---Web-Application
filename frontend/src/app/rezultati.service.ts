import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RezultatiService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  daLiPostojiRezultat(idSportiste, imeSporta, disciplinaSporta, polZaSport){
    const podaci = {
      sport: imeSporta,
      disciplina: disciplinaSporta,
      pol: polZaSport,
      takmicar: idSportiste
    }
    return this.http.post(`${this.uri}/rezultati/daLiPostojiRezultat`, podaci);
  }

  daLiPostojiMec(sport, disciplina, pol, brMeca){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      brMeca: brMeca
    }
    return this.http.post(`${this.uri}/rezultati/daLiPostojiMec`, podaci);
  }

  dohvatiSveMeceve(sport, disciplina, pol){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/rezultati/dohvatiSveMeceve`, podaci);
  }

  dohvatiSveRezultate(){
    return this.http.get(`${this.uri}/rezultati/dohvatiSveRezultate`);
  }

  dohvatiRezultate(imeSporta, disciplinaSporta, polZaSport){
    const podaci = {
      sport: imeSporta,
      disciplina: disciplinaSporta,
      pol: polZaSport
    }
    return this.http.post(`${this.uri}/rezultati/dohvatiRezultate`, podaci);
  }

  dohvatiTrazeneRezultate(sport, disciplina, pol){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/rezultati/dohvatiTrazeneRezultate`, podaci);
  }

  kreirajRezultat(idSportiste, imeSporta, disciplinaSporta, polZaSport, rezultat, repesaz, repesazBroj, trebaRepesaz){
    const podaci = {
      sport: imeSporta,
      disciplina: disciplinaSporta,
      pol: polZaSport,
      takmicar: idSportiste,
      results: rezultat,
      repesaz: repesaz,
      repesazBroj: repesazBroj,
      trebaRepesaz: trebaRepesaz
    }
    return this.http.post(`${this.uri}/rezultati/kreirajRezultat`, podaci);
  }

  dohvatiOveRezultate(rezultat){
    const podaci = {
      results: rezultat
    }
    return this.http.post(`${this.uri}/rezultati/dohvatiOveRezultate`, podaci);
  }

  dodajMec(sport, disciplina, pol, mec, rezultatA, rezultatB, brMeca, zavrsen, tip){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      mec: mec,
      rezultatA: rezultatA,
      rezultatB: rezultatB,
      brMeca: brMeca,
      zavrsen: zavrsen,
      tip: tip
    }
    return this.http.post(`${this.uri}/rezultati/dodajMec`, podaci);
  }

  azurirajRezultat(idSportiste, sport, disciplina, pol, rezultat){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      takmicar: idSportiste,
      rezultat: rezultat
    }
    return this.http.post(`${this.uri}/rezultati/azurirajRezultat`, podaci);
  }

  postaviRepesaz(takmicar, imeSporta, disciplinaSporta, polZaSport, repesaz, br){
    const podaci = {
      sport: imeSporta,
      disciplina: disciplinaSporta,
      pol: polZaSport,
      takmicar: takmicar,
      repesaz: repesaz,
      repesazBroj: br
    }
    return this.http.post(`${this.uri}/rezultati/postaviRepesaz`, podaci);
  }

  azurirajRezultatMeca(sport, disciplina, pol, brMeca, trenRezultatA, trenRezultatB){
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      brMeca: brMeca,
      rezultatA: trenRezultatA,
      rezultatB: trenRezultatB
    }
    return this.http.post(`${this.uri}/rezultati/azurirajRezultatMeca`, podaci);
  }
}
