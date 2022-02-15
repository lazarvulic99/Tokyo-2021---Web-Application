import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
  }

  kor_ime: string;
  lozinka: string;
  nova_lozinka: string;

  poruka: string;

  proveraPolja(): boolean{
    if(this.kor_ime == null || this.lozinka == null || this.nova_lozinka == null){
      return false;
    }else
      return true;
  }

  promeniLozinku(){
    if(this.proveraPolja() == false){
      this.poruka = "Sva polja su obavezna!";
    }else{
      this.korisnikServis.pronadjiKorisnika(this.kor_ime).subscribe((kor: Korisnik)=>{
        if(kor == null){
          this.poruka = "Korisnicko ime ne postoji u bazi!";
        }else{
          if(this.korisnikServis.proveraLozinke(this.lozinka) == false){
            this.poruka = "Lozinka nije u ispravnom formatu!";
            if(this.korisnikServis.proveraLozinke(this.lozinka) == false){
              this.poruka = "Ni stara ni nova lozinka nisu u ispravnom formatu!";
            }
          }else{
            if(this.korisnikServis.proveraLozinke(this.nova_lozinka) == false){
              this.poruka = "Nova lozinka nije u ispravnom formatu!";
            }else{
              if(kor.lozinka.localeCompare(this.lozinka) != 0){
                this.poruka = "Netacna stara lozinka!";
              }else{
                if(this.lozinka.localeCompare(this.nova_lozinka) == 0){
                  this.poruka = "Nova lozinka ne moze biti ista kao stara lozinka!";
                }else{
                  this.korisnikServis.azurirajLozinku(this.kor_ime, this.nova_lozinka).subscribe(resp=>{
                    console.log(resp);
                  })
                  this.poruka = "Uspesno azurirana lozinka!";
                  this.ruter.navigate(['prijava']);
                }
              }
            }
          }
        }
      })
    }
  }

}
