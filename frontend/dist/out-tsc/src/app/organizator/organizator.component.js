import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OrganizatorComponent = class OrganizatorComponent {
    constructor(ruter, sportoviIdisciplineServis, rekordiServis) {
        this.ruter = ruter;
        this.sportoviIdisciplineServis = sportoviIdisciplineServis;
        this.rekordiServis = rekordiServis;
    }
    ngOnInit() {
        this.rekordiServis.dohvatiSveRekorde("M").subscribe((data) => {
            this.muskiRekordi = data;
        });
        this.rekordiServis.dohvatiSveRekorde("Z").subscribe((data) => {
            this.zenskiRekordi = data;
        });
        this.rekordiServis.dohvatiSveRekorde("O").subscribe((data) => {
            this.mesovitiRekordi = data;
        });
    }
    proveraPolja() {
        if (this.sport == null || this.disciplina == null || this.vrsta == null || this.minIgraca == null || this.maxIgraca == null) {
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
            if (this.minIgraca > this.maxIgraca) {
                this.poruka = "Minimalan broj igraca mora biti manji od maksimalnog broja igraca!";
            }
            else {
                this.sportoviIdisciplineServis.dohvatiSportove().subscribe((sportovi) => {
                    var pronasao = false;
                    for (let i = 0; i < sportovi.length; i++) {
                        if (this.sportoviIdisciplineServis.strcasecmp(this.sport, sportovi[i].sport) == 0) {
                            pronasao = true;
                            break;
                        }
                    }
                    if (pronasao == true) {
                        let traziSport = this.sport.charAt(0).toUpperCase() + this.sport.slice(1);
                        this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(traziSport).subscribe((discipline) => {
                            if (discipline.length > 0) {
                                let pronasao = false;
                                for (let i = 0; i < discipline.length; i++) {
                                    if (this.sportoviIdisciplineServis.strcasecmp(this.disciplina, discipline[i].disciplina) == 0) {
                                        pronasao = true;
                                        break;
                                    }
                                }
                                if (pronasao == true) {
                                    this.poruka = "Vec postoje i taj sport i ta disciplina!";
                                }
                                else {
                                    this.poruka = "Ovo je nova disciplina!";
                                    this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disc) => {
                                        let broj = disc.length;
                                        broj = broj + 1;
                                        this.sportoviIdisciplineServis.dodajDisciplinu(broj, traziSport, this.disciplina, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp => {
                                            console.log(resp);
                                            this.sportoviIdisciplineServis.azurirajSport(traziSport, broj).subscribe(resp => {
                                                console.log(resp);
                                                this.poruka = "Uspesno dodata nova disciplina!";
                                            });
                                        });
                                    });
                                }
                            }
                            else {
                                this.poruka = "Prva disciplina za trazeni sport!";
                                this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disc) => {
                                    let broj = disc.length;
                                    broj = broj + 1;
                                    this.sportoviIdisciplineServis.dodajDisciplinu(broj, traziSport, this.disciplina, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp => {
                                        console.log(resp);
                                        this.sportoviIdisciplineServis.azurirajSport(traziSport, 1).subscribe(resp => {
                                            console.log(resp);
                                            this.poruka = "Uspesno dodata nova disciplina!";
                                        });
                                    });
                                });
                            }
                        });
                    }
                    else {
                        let broj = sportovi.length;
                        broj = broj + 1;
                        let traziSport = this.sport.charAt(0).toUpperCase() + this.sport.slice(1);
                        let discp = [];
                        this.sportoviIdisciplineServis.dodajSport(broj, traziSport, discp).subscribe(resp => {
                            console.log(resp);
                            this.poruka = "Uspesno dodat sport!";
                            this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disp) => {
                                let ukupnoDisciplina = disp.length;
                                ukupnoDisciplina = ukupnoDisciplina + 1;
                                this.sportoviIdisciplineServis.dodajDisciplinu(ukupnoDisciplina, traziSport, this.disciplina, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp => {
                                    console.log(resp);
                                    this.sportoviIdisciplineServis.azurirajSport(traziSport, ukupnoDisciplina).subscribe(resp => {
                                        console.log(resp);
                                        this.poruka = "Uspesno dodat i sport i disciplina!";
                                    });
                                });
                            });
                        });
                    }
                });
            }
        }
    }
};
OrganizatorComponent = __decorate([
    Component({
        selector: 'app-organizator',
        templateUrl: './organizator.component.html',
        styleUrls: ['./organizator.component.css']
    })
], OrganizatorComponent);
export { OrganizatorComponent };
//# sourceMappingURL=organizator.component.js.map