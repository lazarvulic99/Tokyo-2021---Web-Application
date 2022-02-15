import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PrijavaComponent = class PrijavaComponent {
    constructor(korisnikServis, ruter) {
        this.korisnikServis = korisnikServis;
        this.ruter = ruter;
    }
    ngOnInit() {
    }
    proveraPolja() {
        if (this.kor_ime == null || this.lozinka == null || this.tip == null) {
            return false;
        }
        else {
            return true;
        }
    }
    prijava() {
        if (this.proveraPolja() == false) {
            this.poruka = "Sva polja su obavezna!";
        }
        else {
            this.korisnikServis.prijavaNaSistem(this.kor_ime, this.lozinka, this.tip).subscribe((kor) => {
                if (kor == null) {
                    this.korisnikServis.pronadjiKorisnika(this.kor_ime).subscribe((korisnik) => {
                        if (korisnik == null) {
                            this.poruka = "Korisnicko ime ne postoji u bazi podataka!";
                        }
                        else {
                            if (this.korisnikServis.proveraLozinke(this.lozinka) == false) {
                                this.poruka = "Lozinka nije u ispravnom formatu!";
                            }
                            else {
                                if (korisnik.lozinka.localeCompare(this.lozinka) != 0) {
                                    this.poruka = "Netacna lozinka!";
                                }
                                else {
                                    if (korisnik.tip.localeCompare(this.tip) != 0) {
                                        this.poruka = "Netacan tip korisnika!";
                                    }
                                }
                            }
                        }
                    });
                }
                else {
                    if (kor.odobren == 0) {
                        this.poruka = "Korisnik ceka na odobrenje!";
                    }
                    else {
                        this.poruka = "Uspesna prijava na sistem";
                        localStorage.setItem('ulogovan', JSON.stringify(kor));
                        if (kor.tip == 'Organizator') {
                            this.ruter.navigate(['organizator']);
                        }
                        else if (kor.tip == 'Vodja') {
                            this.ruter.navigate(['vodja']);
                        }
                        else {
                            this.ruter.navigate(['delegat']);
                        }
                    }
                }
            });
        }
    }
};
PrijavaComponent = __decorate([
    Component({
        selector: 'app-prijava',
        templateUrl: './prijava.component.html',
        styleUrls: ['./prijava.component.css']
    })
], PrijavaComponent);
export { PrijavaComponent };
//# sourceMappingURL=prijava.component.js.map