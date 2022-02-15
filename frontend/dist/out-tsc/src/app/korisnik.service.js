import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let KorisnikService = class KorisnikService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000';
    }
    proveraLozinke(lozinka) {
        let duzinaLozinke = lozinka.length;
        let numUpper = 0;
        let numLower = 0;
        let numDigit = 0;
        let numSpecChar = 0;
        let consecutive4Uslov = true;
        let prviKarakterUslov = false;
        if (duzinaLozinke < 8 || duzinaLozinke > 12) {
            return false;
        }
        else {
            for (let i = 0; i < duzinaLozinke; i++) {
                let karakter = lozinka.charAt(i);
                if (/[a-z]/.test(karakter)) {
                    numLower++;
                }
                if (/[A-Z]/.test(karakter)) {
                    numUpper++;
                }
                if (/[0-9]/.test(karakter)) {
                    numDigit++;
                }
                if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(karakter)) {
                    numSpecChar++;
                }
            }
        }
        if (numUpper < 1 || numLower < 3 || numDigit < 2 || numSpecChar < 2) {
            return false;
        }
        else {
            let prviKarakter = lozinka.charAt(0);
            if ((/[a-z]/.test(prviKarakter)) || (/[A-Z]/.test(prviKarakter))) {
                prviKarakterUslov = true;
            }
            if (prviKarakterUslov == false) {
                return false;
            }
            else {
                for (let j = 0; j < duzinaLozinke - 3; j++) {
                    let prviZnak = lozinka.charAt(j);
                    let drugiZnak = lozinka.charAt(j + 1);
                    let treciZnak = lozinka.charAt(j + 2);
                    let cetvrtiZnak = lozinka.charAt(j + 3);
                    if ((prviZnak == drugiZnak) && (drugiZnak == treciZnak) && (treciZnak == cetvrtiZnak)) {
                        consecutive4Uslov = false;
                        break;
                    }
                }
                if (consecutive4Uslov == false) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }
    prijavaNaSistem(kor_ime, lozinka, tip) {
        const podaci = {
            kor_ime: kor_ime,
            lozinka: lozinka,
            tip: tip
        };
        return this.http.post(`${this.uri}/korisnici/prijavaNaSistem`, podaci);
    }
    pronadjiKorisnika(kor_ime) {
        const podaci = {
            kor_ime: kor_ime
        };
        return this.http.post(`${this.uri}/korisnici/pronadjiKorisnika`, podaci);
    }
    pronadjiSportistu(imeIPrezime) {
        const podaci = {
            imeIPrezime: imeIPrezime
        };
        return this.http.post(`${this.uri}/korisnici/pronadjiSportistu`, podaci);
    }
    vecPostojiVodja(zemlja, tip) {
        const podaci = {
            zemlja: zemlja,
            tip: tip
        };
        console.log(zemlja);
        console.log(tip);
        return this.http.post(`${this.uri}/korisnici/vecPostojiVodja`, podaci);
    }
    dodajKorisnika(kor_ime, lozinka, ime, prezime, zemlja, mejl, tip) {
        const podaci = {
            kor_ime: kor_ime,
            lozinka: lozinka,
            ime: ime,
            prezime: prezime,
            zemlja: zemlja,
            mejl: mejl,
            tip: tip,
            odobren: 0
        };
        return this.http.post(`${this.uri}/korisnici/dodajKorisnika`, podaci);
    }
    dodajSportistu(idSportiste, imeIPrezime, pol, nacionalnost, sport, disciplina, medalja) {
        const podaci = {
            idSportiste: idSportiste,
            imeIPrezime: imeIPrezime,
            pol: pol,
            nacionalnost: nacionalnost,
            sport: sport,
            discipline: disciplina,
            medalja: medalja
        };
        return this.http.post(`${this.uri}/korisnici/dodajSportistu`, podaci);
    }
    dohvatiSveSportiste() {
        return this.http.get(`${this.uri}/korisnici/dohvatiSveSportiste`);
    }
    azurirajSportistiDiscipline(imeIPrezime, disciplina) {
        const podaci = {
            imeIPrezime: imeIPrezime,
            disciplina: disciplina
        };
        return this.http.post(`${this.uri}/korisnici/azurirajSportistiDiscipline`, podaci);
    }
    azurirajLozinku(kor_ime, lozinka) {
        const podaci = {
            kor_ime: kor_ime,
            lozinka: lozinka
        };
        return this.http.post(`${this.uri}/korisnici/azurirajLozinku`, podaci);
    }
};
KorisnikService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], KorisnikService);
export { KorisnikService };
//# sourceMappingURL=korisnik.service.js.map