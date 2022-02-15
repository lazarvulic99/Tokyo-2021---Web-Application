import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  potvrda_lozinke: string;
  ime: string;
  prezime: string;
  zemlja: string;
  mejl: string;
  tip: string;
  poruka: string;

  proveraPolja(): boolean{
    if(this.kor_ime == null || this.lozinka == null || this.potvrda_lozinke == null || this.ime == null || this.prezime == null || this.zemlja == null || this.mejl == null || this.tip == null)
      return false;
    else
      return true;
  }

   registracija(){
    if(this.proveraPolja() == false){
      this.poruka = "Sva polja su obavezna!";
    }else{
      if(this.korisnikServis.proveraLozinke(this.lozinka) == false){
        this.poruka = "Lozinka nije u ispravnom formatu!";
        if(this.korisnikServis.proveraLozinke(this.potvrda_lozinke) == false)
          this.poruka = "Ni lozinka, ni potvrda lozinke nisu u ispravnom formatu!";
      }else{
        if(this.korisnikServis.proveraLozinke(this.potvrda_lozinke) == false){
          this.poruka = "Potvrda lozinke nije u ispravnom formatu!";
        }else{
          if(this.lozinka.localeCompare(this.potvrda_lozinke) != 0){
            this.poruka = "Lozinka i potvrda lozinke moraju biti identicne!";
          }else{
            this.korisnikServis.pronadjiKorisnika(this.kor_ime).subscribe((kor: Korisnik)=>{
              if(kor == null){
                if(this.tip.localeCompare("Vodja") == 0){
                  this.korisnikServis.vecPostojiVodja(this.zemlja, this.tip).subscribe((vodja: Korisnik)=>{
                    if(vodja != null && vodja.odobren == 1){
                      this.poruka = "Vec postoji vodja delegacije za odabranu zemlju!";
                    }else{
                      this.korisnikServis.dodajKorisnika(this.kor_ime, this.lozinka, this.ime, this.prezime, this.zemlja, this.mejl, this.tip).subscribe(resp=>{
                        console.log(resp);
                        this.poruka = "Uspesno dodat korisnik!";
                      })
                    }
                  })
                }else{
                  this.korisnikServis.dodajKorisnika(this.kor_ime, this.lozinka, this.ime, this.prezime, this.zemlja, this.mejl, this.tip).subscribe(resp=>{
                    console.log(resp);
                    this.poruka = "Uspesno dodat korisnik!";
                  })
                }
              }else{
                this.poruka = "Korisnik vec postoji u sistemu!";
              }
            })
          }
        }
      }
    }
  }
}
