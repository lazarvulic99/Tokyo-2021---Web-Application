import { __decorate } from "tslib";
import { Component } from '@angular/core';
let VodjaComponent = class VodjaComponent {
    constructor(ruter, sportoviIdisciplineServis, korisnikServis) {
        this.ruter = ruter;
        this.sportoviIdisciplineServis = sportoviIdisciplineServis;
        this.korisnikServis = korisnikServis;
    }
    ngOnInit() {
        this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
        this.nacionalnost = this.korisnik.zemlja;
        this.sportoviIdisciplineServis.dohvatiSportove().subscribe((podaci) => {
            this.sportovi = podaci;
        });
    }
    nadjiDiscipline() {
        this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(this.sport).subscribe((podaci) => {
            this.discipline = podaci;
        });
    }
    proveraPolja() {
        if (this.ime == null || this.prezime == null || this.pol == null || this.sport == null || this.disciplina == null) {
            return false;
        }
        else {
            return true;
        }
    }
    dodaj() {
        if (this.proveraPolja() == false) {
            this.poruka = "Sva polja su obavezna!";
        }
        else {
            let imeIPrezime = this.ime + " " + this.prezime;
            let medalje = " ";
            this.korisnikServis.pronadjiSportistu(imeIPrezime).subscribe((data) => {
                if (data == null) {
                    this.poruka = "Novi sportista";
                    this.korisnikServis.dohvatiSveSportiste().subscribe((data) => {
                        if (data == null) {
                            let broj = 1;
                            this.korisnikServis.dodajSportistu(broj, imeIPrezime, this.pol, this.nacionalnost, this.sport, this.disciplina, medalje).subscribe(resp => {
                                console.log(resp);
                                this.poruka = "Sportista uspesno dodat!";
                            });
                        }
                        else {
                            let broj = data.length;
                            broj = broj + 1;
                            this.korisnikServis.dodajSportistu(broj, imeIPrezime, this.pol, this.nacionalnost, this.sport, this.disciplina, medalje).subscribe(resp => {
                                console.log(resp);
                                this.poruka = "Sportista uspesno dodat!";
                            });
                        }
                    });
                }
                else {
                    if (this.sport.localeCompare(data.sport) != 0) {
                        this.poruka = "Sportisti je vec dodeljen drugi sport!";
                    }
                    else {
                        for (let i = 0; i < this.disciplina.length; i++) {
                            let postojiVecDisc = false;
                            for (let j = 0; j < data.discipline.length; j++) {
                                if (this.disciplina[i] == data.discipline[j]) {
                                    postojiVecDisc = true;
                                    break;
                                }
                            }
                            if (postojiVecDisc == false) {
                                this.korisnikServis.azurirajSportistiDiscipline(imeIPrezime, this.disciplina[i]).subscribe(resp => {
                                    console.log(resp);
                                });
                            }
                        }
                        this.poruka = "Azuriranje uspesno!";
                    }
                }
            });
        }
    }
};
VodjaComponent = __decorate([
    Component({
        selector: 'app-vodja',
        templateUrl: './vodja.component.html',
        styleUrls: ['./vodja.component.css']
    })
], VodjaComponent);
export { VodjaComponent };
//# sourceMappingURL=vodja.component.js.map