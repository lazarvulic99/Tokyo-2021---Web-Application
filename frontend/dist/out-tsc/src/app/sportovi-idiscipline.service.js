import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let SportoviIdisciplineService = class SportoviIdisciplineService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000';
    }
    strcasecmp(s1, s2) {
        s1 = (s1 + '').toLowerCase();
        s2 = (s2 + '').toLowerCase();
        return s1 > s2 ? 1 : (s1 < s2 ? -1 : 0);
    }
    dohvatiSportove() {
        return this.http.get(`${this.uri}/sportoviIdiscipline/dohvatiSportove`);
    }
    dohvatiDisciplineZaSport(sport) {
        const podaci = {
            sport: sport
        };
        return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiDisciplineZaSport`, podaci);
    }
    dohvatiDiscipline() {
        return this.http.get(`${this.uri}/sportoviIdiscipline/dohvatiDiscipline`);
    }
    dodajDisciplinu(idDis, sport, disciplina, vrsta, minIgraca, maxIgraca) {
        const podaci = {
            idDis: idDis,
            sport: sport,
            disciplina: disciplina,
            vrsta: vrsta,
            minIgraca: minIgraca,
            maxIgraca: maxIgraca
        };
        return this.http.post(`${this.uri}/sportoviIdiscipline/dodajDisciplinu`, podaci);
    }
    dohvatiTrazenuDisciplinu(sport, disciplina) {
        const podaci = {
            sport: sport,
            disciplina: disciplina
        };
        return this.http.post(`${this.uri}/sportoviIdiscipline/dohvatiTrazenuDisciplinu`, podaci);
    }
    azurirajSport(sport, broj) {
        const podaci = {
            sport: sport,
            broj: broj
        };
        return this.http.post(`${this.uri}/sportoviIdiscipline/azurirajSport`, podaci);
    }
    dodajSport(idSporta, sport, discipline) {
        const podaci = {
            idSporta: idSporta,
            sport: sport,
            discipline: discipline
        };
        return this.http.post(`${this.uri}/sportoviIdiscipline/dodajSport`, podaci);
    }
};
SportoviIdisciplineService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SportoviIdisciplineService);
export { SportoviIdisciplineService };
//# sourceMappingURL=sportovi-idiscipline.service.js.map