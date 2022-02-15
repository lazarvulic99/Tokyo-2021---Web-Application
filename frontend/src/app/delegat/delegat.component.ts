import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from 'src/models/format';
import { Korisnik } from 'src/models/korisnik';
import { Mec } from 'src/models/mec';
import { mecFront } from 'src/models/mecFront';
import { Medalja } from 'src/models/medalja';
import { RepesazFront } from 'src/models/repesazFront';
import { Rezultat } from 'src/models/rezultat';
import { RezultatFront } from 'src/models/rezultatFront';
import { Sportista } from 'src/models/sportista';
import { Takmicenje } from 'src/models/takmicenje';
import { FormatService } from '../format.service';
import { MedaljeService } from '../medalje.service';
import { RezultatiService } from '../rezultati.service';
import { SportistiService } from '../sportisti.service';
import { TakmicenjaService } from '../takmicenja.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private ruter: Router, private medaljeServis: MedaljeService, private rezultatiServis: RezultatiService, private formatServis: FormatService, private takmicenjaServis: TakmicenjaService, private sportistiServis: SportistiService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik == null){
      this.ruter.navigate(['']);
    }
    this.mojDelegat = this.korisnik.ime + " " + this.korisnik.prezime;
    if(this.korisnik.tip != 'Delegat'){
      localStorage.removeItem('ulogovan');
      this.ruter.navigate(['']);
    }
    console.log(this.mojDelegat);
    this.porukaDatum = "";
    this.brUnetihRepesaza = 0;
    this.prikaziRezultate = 0;
    this.pobednikRepesaz = null;
    this.drugoMestoRepesaz = null;
    this.treceMestoRepesaz = null;
    this.mojDelegat = this.korisnik.ime + " " + this.korisnik.prezime;
    console.log(this.mojDelegat);
    this.dohvatiDelegatovaTakmicenja(this.mojDelegat);
  } 

  resetPromenljive(){
    this.nemaIspis = 0;
    this.zavrsenoJe = 0;
    this.zavrsenRepesaz == 0;
    this.takmicari = [];
    this.rezultat = [];
    this.trenSportisti = [];
    this.sportistiNaTakmicenju = [];
    this.prikaziRezultate = 0;
    this.dosadasnjiRezultati = [];
    console.log(this.unosRezultata);
    let niz: string[];
    niz = this.unosRezultata.split('-');
    console.log(niz);
    this.imeSporta = niz[0];
    this.disciplinaSporta = niz[1];
    this.polZaSport = niz[2];
    this.dohvatiSvimaDosadanjeRezultate();
    if(this.unosRezultata != null || (this.unosRezultata != null && this.unosRezultata != "Odaberi takmicenje")){
      for(let i=0; i<this.mojaTakmicenja.length; i++){
        if(this.mojaTakmicenja[i].sport == this.imeSporta && this.mojaTakmicenja[i].disciplina == this.disciplinaSporta && this.mojaTakmicenja[i].pol == this.polZaSport){
          this.takmicari = this.mojaTakmicenja[i].takmicari;
        }
      }
      console.log(this.takmicari);
    }
    if(this.takmicari.length > 0){
      for(let i=0; i<this.takmicari.length; i++){
        let broj = this.takmicari[i];
        this.sportistiServis.dohvatiSportistu(broj).subscribe((member: Sportista)=>{
          this.trenSportisti.push(member);
        })
      }
      console.log(this.trenSportisti);
      if(this.imeSporta == "Tenis"){
        console.log("Tenis");
        this.zavrsenRepesaz = 0;
        this.zavrseno = 0;
        this.porukaUnos = "";
      }else{
        this.traziSeTenis = 0;
        this.zavrsenTenis = 0;
        this.formatServis.dohvatiFormat(this.imeSporta, this.disciplinaSporta).subscribe((data: Format)=>{
          this.trenutniFormat = data;
          console.log(this.trenutniFormat);
          console.log(this.dosadasnjiRezultati);
          console.log("Tu sam u metodi!");
          if(this.dosadasnjiRezultati.length*this.trenutniFormat.brRundi == this.trenutniFormat.brRundi*this.trenSportisti.length){
            this.zavrsenoJe = 1;
            console.log(this.zavrsenoJe);
            window.setTimeout(location.reload.bind(location), 2000);
          }
        })
      }
    }
  }


  trenSportisti: Sportista[] = [];
  zavrsenoJe: number = 0;
  prikaziRezultate: number = 0;
  mojDelegat: string = "";
  korisnik: Korisnik;
  mojaTakmicenja: Takmicenje[];
  poruka: string;
  datumPocetka: string[] = [];
  vremePocetka: Time[] = [];
  unosRezultata: string;
  trebaKostur: number = 0;
  trenutniSportInfo: string[] = [];
  levaPolovina: number[] = [];
  desnaPolovina: number[] = [];
  mecevi: Mec[] = [];
  rezultatMecaA: number[] = [];
  rezultatMecaB: number[] = [];

  pokreniAlgoritam(){
    this.prikaziRezultate = 0;
    this.traziSeTenis = 1;
    this.zavrsenRepesaz = 0;
    this.trenutniSportInfo = [];
    this.levaPolovina = [];
    this.desnaPolovina = [];
    console.log(this.unosRezultata);
    this.trenutniSportInfo[0] = this.unosRezultata.split("-")[0];
    this.trenutniSportInfo[1] = this.unosRezultata.split("-")[1];
    this.trenutniSportInfo[2] = this.unosRezultata.split("-")[2];
    let sport = this.trenutniSportInfo[0];
    let disciplina = this.trenutniSportInfo[1];
    let pol = this.trenutniSportInfo[2];
    if(sport != "Tenis"){
      this.porukaUnos = "Trazeni sport mora biti tenis ili neki drugi ekipni!";
    }else{
      this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
        this.mecevi = vraceniMecevi;
      })
      console.log(this.trenutniSportInfo);
      if(this.trenutniSportInfo[0] == "Tenis"){
        console.log("Jeste tenis!");
        this.sportistiNaTakmicenju = [];
        console.log(this.unosRezultata);
        if(this.unosRezultata != null || (this.unosRezultata != null && this.unosRezultata != "Odaberi takmicenje")){
          this.imeSporta = this.unosRezultata.split("-")[0];
          this.disciplinaSporta = this.unosRezultata.split("-")[1];
          this.polZaSport = this.unosRezultata.split("-")[2];
          console.log(this.imeSporta);
          console.log(this.disciplinaSporta);
          console.log(this.polZaSport);
          for(let i=0; i<this.mojaTakmicenja.length; i++){
            if(this.mojaTakmicenja[i].sport == this.imeSporta && this.mojaTakmicenja[i].disciplina == this.disciplinaSporta && this.mojaTakmicenja[i].pol == this.polZaSport){
              this.takmicari = this.mojaTakmicenja[i].takmicari;
            }
          }
          console.log(this.takmicari);
        }
        if(this.takmicari.length == 4){
          console.log("Ima 4 igraca");
          let br = this.takmicari.length;
          console.log(br);
          this.formirajKosturZa4();
        }else if(this.takmicari.length == 8){
          console.log("ima 8 igraca");
          this.formirajKosturZa8();
        }else if(this.takmicari.length == 16){
          console.log("Ima 16 igraca");
          let br = this.takmicari.length;
          console.log(br);
          this.formirajKosturZa16();
        }
      }
    }
  }

  formirajKosturZa4(){
    //console.log("Kostur za 4");
    for(let i=1; i<5; i++){
      if(i%2 == 1){
        this.levaPolovina.push(this.takmicari[i-1]);
      }else{
        this.desnaPolovina.push(this.takmicari[i-1]);
      }
    }
    console.log(this.levaPolovina);
    console.log(this.desnaPolovina);
    this.formirajMeceveZaLevuPolovinu4();
    this.formirajMeceveZaDesnuPolovinu4();
  }

  formirajKosturZa8(){
    for(let i=1; i<9; i++){
      if(i%2 == 1){
        this.levaPolovina.push(this.takmicari[i-1]);
      }else{
        this.desnaPolovina.push(this.takmicari[i-1]);
      }
    }
    console.log(this.levaPolovina);
    console.log(this.desnaPolovina);
    this.formirajMeceveZaLevuPolovinu8();
    this.formirajMeceveZaDesnuPolovinu8();
  }

  formirajKosturZa16(){
    for(let i=1; i<17; i++){
      if(i%2 == 1){
        this.levaPolovina.push(this.takmicari[i-1]);
      }else{
        this.desnaPolovina.push(this.takmicari[i-1]);
      }
    }
    console.log(this.levaPolovina);
    console.log(this.desnaPolovina);
    this.formirajMeceveZaLevuPolovinu16();
    this.formirajMeceveZaDesnuPolovinu16();
  }

  formirajMeceveZaLevuPolovinu4(){
    let br11: number;
    let br12: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    br11 = Math.floor(Math.random()*2);
    br12 = Math.floor(Math.random()*2);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*2);
    }
    mec1takmicar1 = this.levaPolovina[br11];
    mec1takmicar2 = this.levaPolovina[br12];
    let mec1: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    //console.log(mec1);
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        console.log(mec1);
        let sport: string;
        let disciplina: string;
        let pol: string;
        sport = this.trenutniSportInfo[0];
        disciplina = this.trenutniSportInfo[1];
        pol = this.trenutniSportInfo[2];
        this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 1).subscribe((postoji: Mec)=>{
          if(postoji == null){
            this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 1, 0, "1/2 finale").subscribe(resp=>{
              console.log(resp);
              console.log("Dodao sam mec levog polukostura!");
              this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                this.mecevi = vraceniMecevi;
              })  
            })
          }
        })
      })
    })
  }

  formirajMeceveZaDesnuPolovinu4(){
    let br11: number;
    let br12: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    br11 = Math.floor(Math.random()*2);
    br12 = Math.floor(Math.random()*2);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*2);
    }
    mec1takmicar1 = this.desnaPolovina[br11];
    mec1takmicar2 = this.desnaPolovina[br12];
    let mec1: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    //console.log(mec1);
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        console.log(mec1);
        let sport: string;
        let disciplina: string;
        let pol: string;
        sport = this.trenutniSportInfo[0];
        disciplina = this.trenutniSportInfo[1];
        pol = this.trenutniSportInfo[2];
        this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 2).subscribe((postoji: Mec)=>{
          if(postoji == null){
            this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 2, 0, "1/2 finale").subscribe(resp=>{
              console.log(resp);
              console.log("Dodao sam mec desnog polukostura!");
              this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                this.mecevi = vraceniMecevi;
              })  
            })
          }
        })
      })
    })
  }

  formirajMeceveZaLevuPolovinu8(){
    let br11: number;
    let br12: number;
    let br21: number;
    let br22: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    let mec2takmicar1: number;
    let mec2takmicar2: number;
    br11 = Math.floor(Math.random()*4);
    br12 = Math.floor(Math.random()*4);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*4);
    }
    br21 = Math.floor(Math.random()*4);
    while(br21 == br11 || br21 == br12){
      br21 = Math.floor(Math.random()*4);
    }
    br22 = Math.floor(Math.random()*4);
    while(br22 == br11 || br22 == br12 || br22 == br21){
      br22 = Math.floor(Math.random()*4);
    }
    mec1takmicar1 = this.levaPolovina[br11];
    mec1takmicar2 = this.levaPolovina[br12];
    mec2takmicar1 = this.levaPolovina[br21];
    mec2takmicar2 = this.levaPolovina[br22];
    let mec1: mecFront = new mecFront();
    let mec2: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    mec2.takmicarA = mec2takmicar1;
    mec2.takmicarB = mec2takmicar2;
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        this.sportistiServis.dohvatiSportistu(mec2takmicar1).subscribe((data: Sportista)=>{
          mec2.sportistaA = data;
          this.sportistiServis.dohvatiSportistu(mec2takmicar2).subscribe((data: Sportista)=>{
            mec2.sportistaB = data;
            console.log(mec1);
            console.log(mec2);
            let sport: string;
            let disciplina: string;
            let pol: string;
            sport = this.trenutniSportInfo[0];
            disciplina = this.trenutniSportInfo[1];
            pol = this.trenutniSportInfo[2];
            this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 1).subscribe((postoji: Mec)=>{
              if(postoji == null){
                this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 1, 0, "1/4 finale").subscribe(resp=>{
                  console.log(resp);
                  this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 2).subscribe((postoji: Mec)=>{
                    if(postoji == null){
                      this.rezultatiServis.dodajMec(sport, disciplina, pol, mec2, 0, 0, 2, 0, "1/4 finale").subscribe(resp=>{
                        console.log(resp);
                        console.log("Dodao sam meceve levog polukostura!");
                        this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                          this.mecevi = vraceniMecevi;
                        })
                      })
                    }
                  })
                })
              }
            })
          })
        })
      })
    })
  }

  formirajMeceveZaDesnuPolovinu8(){
    let br11: number;
    let br12: number;
    let br21: number;
    let br22: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    let mec2takmicar1: number;
    let mec2takmicar2: number;
    br11 = Math.floor(Math.random()*4);
    br12 = Math.floor(Math.random()*4);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*4);
    }
    br21 = Math.floor(Math.random()*4);
    while(br21 == br11 || br21 == br12){
      br21 = Math.floor(Math.random()*4);
    }
    br22 = Math.floor(Math.random()*4);
    while(br22 == br11 || br22 == br12 || br22 == br21){
      br22 = Math.floor(Math.random()*4);
    }
    mec1takmicar1 = this.desnaPolovina[br11];
    mec1takmicar2 = this.desnaPolovina[br12];
    mec2takmicar1 = this.desnaPolovina[br21];
    mec2takmicar2 = this.desnaPolovina[br22];
    let mec1: mecFront = new mecFront();
    let mec2: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    mec2.takmicarA = mec2takmicar1;
    mec2.takmicarB = mec2takmicar2;
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        this.sportistiServis.dohvatiSportistu(mec2takmicar1).subscribe((data: Sportista)=>{
          mec2.sportistaA = data;
          this.sportistiServis.dohvatiSportistu(mec2takmicar2).subscribe((data: Sportista)=>{
            mec2.sportistaB = data;
            console.log(mec1);
            console.log(mec2);
            let sport: string;
            let disciplina: string;
            let pol: string;
            sport = this.trenutniSportInfo[0];
            disciplina = this.trenutniSportInfo[1];
            pol = this.trenutniSportInfo[2];
            this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 3).subscribe((postoji: Mec)=>{
              if(postoji == null){
                this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 3, 0, "1/4 finale").subscribe(resp=>{
                  console.log(resp);
                  this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 4).subscribe((postoji: Mec)=>{
                    if(postoji == null){
                      this.rezultatiServis.dodajMec(sport, disciplina, pol, mec2, 0, 0, 4, 0, "1/4 finale").subscribe(resp=>{
                        console.log(resp);
                        console.log("Dodao sam meceve desnog polukostura!");
                        this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                          this.mecevi = vraceniMecevi;
                        })
                      })
                    }
                  })
                })
              }
            })
          })
        })
      })
    })
  }

  formirajMeceveZaLevuPolovinu16(){
    let br11: number;
    let br12: number;
    let br21: number;
    let br22: number;
    let br31: number;
    let br32: number;
    let br41: number;
    let br42: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    let mec2takmicar1: number;
    let mec2takmicar2: number;
    let mec3takmicar1: number;
    let mec3takmicar2: number;
    let mec4takmicar1: number;
    let mec4takmicar2: number;
    br11 = Math.floor(Math.random()*8);
    br12 = Math.floor(Math.random()*8);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*8);
    }
    br21 = Math.floor(Math.random()*8);
    while(br21 == br11 || br21 == br12){
      br21 = Math.floor(Math.random()*8);
    }
    br22 = Math.floor(Math.random()*8);
    while(br22 == br11 || br22 == br12 || br22 == br21){
      br22 = Math.floor(Math.random()*8);
    }
    br31 = Math.floor(Math.random()*8);
    while(br31 == br11 || br31 == br12 || br31 == br21 || br31 == br22){
      br31 = Math.floor(Math.random()*8);
    }
    br32 = Math.floor(Math.random()*8);
    while(br32 == br11 || br32 == br12 || br32 == br21 || br32 == br22 || br32 == br31){
      br32 = Math.floor(Math.random()*8);
    }
    br41 = Math.floor(Math.random()*8);
    while(br41 == br11 || br41 == br12 || br41 == br21 || br41 == br22 || br41 == br31 || br41 == br32){
      br41 = Math.floor(Math.random()*8);
    }
    br42 = Math.floor(Math.random()*8);
    while(br42 == br11 || br42 == br12 || br42 == br21 || br42 == br22 || br42 == br31 || br42 == br32 || br42 == br41){
      br42 = Math.floor(Math.random()*8);
    }
    mec1takmicar1 = this.levaPolovina[br11];
    mec1takmicar2 = this.levaPolovina[br12];
    mec2takmicar1 = this.levaPolovina[br21];
    mec2takmicar2 = this.levaPolovina[br22];
    mec3takmicar1 = this.levaPolovina[br31];
    mec3takmicar2 = this.levaPolovina[br32];
    mec4takmicar1 = this.levaPolovina[br41];
    mec4takmicar2 = this.levaPolovina[br42];
    let mec1: mecFront = new mecFront();
    let mec2: mecFront = new mecFront();
    let mec3: mecFront = new mecFront();
    let mec4: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    mec2.takmicarA = mec2takmicar1;
    mec2.takmicarB = mec2takmicar2;
    mec3.takmicarA = mec3takmicar1;
    mec3.takmicarB = mec3takmicar2;
    mec4.takmicarA = mec4takmicar1;
    mec4.takmicarB = mec4takmicar2;
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        this.sportistiServis.dohvatiSportistu(mec2takmicar1).subscribe((data: Sportista)=>{
          mec2.sportistaA = data;
          this.sportistiServis.dohvatiSportistu(mec2takmicar2).subscribe((data: Sportista)=>{
            mec2.sportistaB = data;
            this.sportistiServis.dohvatiSportistu(mec3takmicar1).subscribe((data: Sportista)=>{
              mec3.sportistaA = data;
              this.sportistiServis.dohvatiSportistu(mec3takmicar2).subscribe((data: Sportista)=>{
                mec3.sportistaB = data;
                this.sportistiServis.dohvatiSportistu(mec4takmicar1).subscribe((data: Sportista)=>{
                  mec4.sportistaA = data;
                  this.sportistiServis.dohvatiSportistu(mec4takmicar2).subscribe((data: Sportista)=>{
                    mec4.sportistaB = data;
                    console.log(mec1);
                    console.log(mec2);
                    console.log(mec3);
                    console.log(mec4);
                    let sport: string;
                    let disciplina: string;
                    let pol: string;
                    sport = this.trenutniSportInfo[0];
                    disciplina = this.trenutniSportInfo[1];
                    pol = this.trenutniSportInfo[2];
                    this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 1).subscribe((postoji: Mec)=>{
                      if(postoji == null){
                        this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 1, 0, "1/8 finale").subscribe(resp=>{
                          console.log(resp);
                          this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 2).subscribe((postoji: Mec)=>{
                            if(postoji == null){
                              this.rezultatiServis.dodajMec(sport, disciplina, pol, mec2, 0, 0, 2, 0, "1/8 finale").subscribe(resp=>{
                                console.log(resp);
                                this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 3).subscribe((postoji: Mec)=>{
                                  if(postoji == null){
                                    this.rezultatiServis.dodajMec(sport, disciplina, pol, mec3, 0, 0, 3, 0, "1/8 finale").subscribe(resp=>{
                                      console.log(resp);
                                      this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 4).subscribe((postoji: Mec)=>{
                                        if(postoji == null){
                                          this.rezultatiServis.dodajMec(sport, disciplina, pol, mec4, 0, 0, 4, 0, "1/8 finale").subscribe(resp=>{
                                            console.log(resp);
                                            console.log("Dodao sam meceve levog polukostura!");
                                            this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                                              this.mecevi = vraceniMecevi;
                                            })
                                          })
                                        }
                                      })
                                    })
                                  }
                                })
                              })
                            }
                          })
                        })
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  formirajMeceveZaDesnuPolovinu16(){
    let br11: number;
    let br12: number;
    let br21: number;
    let br22: number;
    let br31: number;
    let br32: number;
    let br41: number;
    let br42: number;
    let mec1takmicar1: number;
    let mec1takmicar2: number;
    let mec2takmicar1: number;
    let mec2takmicar2: number;
    let mec3takmicar1: number;
    let mec3takmicar2: number;
    let mec4takmicar1: number;
    let mec4takmicar2: number;
    br11 = Math.floor(Math.random()*8);
    br12 = Math.floor(Math.random()*8);
    while(br11 == br12){
      br12 = Math.floor(Math.random()*8);
    }
    br21 = Math.floor(Math.random()*8);
    while(br21 == br11 || br21 == br12){
      br21 = Math.floor(Math.random()*8);
    }
    br22 = Math.floor(Math.random()*8);
    while(br22 == br11 || br22 == br12 || br22 == br21){
      br22 = Math.floor(Math.random()*8);
    }
    br31 = Math.floor(Math.random()*8);
    while(br31 == br11 || br31 == br12 || br31 == br21 || br31 == br22){
      br31 = Math.floor(Math.random()*8);
    }
    br32 = Math.floor(Math.random()*8);
    while(br32 == br11 || br32 == br12 || br32 == br21 || br32 == br22 || br32 == br31){
      br32 = Math.floor(Math.random()*8);
    }
    br41 = Math.floor(Math.random()*8);
    while(br41 == br11 || br41 == br12 || br41 == br21 || br41 == br22 || br41 == br31 || br41 == br32){
      br41 = Math.floor(Math.random()*8);
    }
    br42 = Math.floor(Math.random()*8);
    while(br42 == br11 || br42 == br12 || br42 == br21 || br42 == br22 || br42 == br31 || br42 == br32 || br42 == br41){
      br42 = Math.floor(Math.random()*8);
    }
    mec1takmicar1 = this.desnaPolovina[br11];
    mec1takmicar2 = this.desnaPolovina[br12];
    mec2takmicar1 = this.desnaPolovina[br21];
    mec2takmicar2 = this.desnaPolovina[br22];
    mec3takmicar1 = this.desnaPolovina[br31];
    mec3takmicar2 = this.desnaPolovina[br32];
    mec4takmicar1 = this.desnaPolovina[br41];
    mec4takmicar2 = this.desnaPolovina[br42];
    let mec1: mecFront = new mecFront();
    let mec2: mecFront = new mecFront();
    let mec3: mecFront = new mecFront();
    let mec4: mecFront = new mecFront();
    mec1.takmicarA = mec1takmicar1;
    mec1.takmicarB = mec1takmicar2;
    mec2.takmicarA = mec2takmicar1;
    mec2.takmicarB = mec2takmicar2;
    mec3.takmicarA = mec3takmicar1;
    mec3.takmicarB = mec3takmicar2;
    mec4.takmicarA = mec4takmicar1;
    mec4.takmicarB = mec4takmicar2;
    this.sportistiServis.dohvatiSportistu(mec1takmicar1).subscribe((data: Sportista)=>{
      mec1.sportistaA = data;
      this.sportistiServis.dohvatiSportistu(mec1takmicar2).subscribe((data: Sportista)=>{
        mec1.sportistaB = data;
        this.sportistiServis.dohvatiSportistu(mec2takmicar1).subscribe((data: Sportista)=>{
          mec2.sportistaA = data;
          this.sportistiServis.dohvatiSportistu(mec2takmicar2).subscribe((data: Sportista)=>{
            mec2.sportistaB = data;
            this.sportistiServis.dohvatiSportistu(mec3takmicar1).subscribe((data: Sportista)=>{
              mec3.sportistaA = data;
              this.sportistiServis.dohvatiSportistu(mec3takmicar2).subscribe((data: Sportista)=>{
                mec3.sportistaB = data;
                this.sportistiServis.dohvatiSportistu(mec4takmicar1).subscribe((data: Sportista)=>{
                  mec4.sportistaA = data;
                  this.sportistiServis.dohvatiSportistu(mec4takmicar2).subscribe((data: Sportista)=>{
                    mec4.sportistaB = data;
                    console.log(mec1);
                    console.log(mec2);
                    console.log(mec3);
                    console.log(mec4);
                    let sport: string;
                    let disciplina: string;
                    let pol: string;
                    sport = this.trenutniSportInfo[0];
                    disciplina = this.trenutniSportInfo[1];
                    pol = this.trenutniSportInfo[2];
                    this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 5).subscribe((postoji: Mec)=>{
                      if(postoji == null){
                        this.rezultatiServis.dodajMec(sport, disciplina, pol, mec1, 0, 0, 5, 0, "1/8 finale").subscribe(resp=>{
                          console.log(resp);
                          this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 6).subscribe((postoji: Mec)=>{
                            if(postoji == null){
                              this.rezultatiServis.dodajMec(sport, disciplina, pol, mec2, 0, 0, 6, 0, "1/8 finale").subscribe(resp=>{
                                console.log(resp);
                                this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 7).subscribe((postoji: Mec)=>{
                                  if(postoji == null){
                                    this.rezultatiServis.dodajMec(sport, disciplina, pol, mec3, 0, 0, 7, 0, "1/8 finale").subscribe(resp=>{
                                      console.log(resp);
                                      this.rezultatiServis.daLiPostojiMec(sport, disciplina, pol, 8).subscribe((postoji: Mec)=>{
                                        if(postoji == null){
                                          this.rezultatiServis.dodajMec(sport, disciplina, pol, mec4, 0, 0, 8, 0, "1/8 finale").subscribe(resp=>{
                                            console.log(resp);
                                            console.log("Dodao sam meceve desnog polukostura!");
                                            this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
                                              this.mecevi = vraceniMecevi;
                                            })
                                          })
                                        }
                                      })
                                    })
                                  }
                                })
                              })
                            }
                          })
                        })
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  dodajRezultatMeca(mec, k){
    let trenRezultatA = this.rezultatMecaA[k];
    let trenRezultatB = this.rezultatMecaB[k];
    console.log(trenRezultatA);
    console.log(trenRezultatB);
    if(trenRezultatA != 2 && trenRezultatB !=2){
      this.porukaUnos = "Mora postojati pobednik! Igra se u 2 dobijena seta!";
    }else{
      if(trenRezultatA == 2 && trenRezultatB == 2){
        this.porukaUnos = "Igra se u 2 dobijena seta. Moguci rezultati su: 2:0, 2:1, 1:2, 0:2";
      }else{
        this.porukaUnos = "Sve ok!";
        let trenMec: Mec;
        trenMec = mec;
        console.log(trenMec.brMeca);
        let sport = this.unosRezultata.split('-')[0];
        let disciplina = this.unosRezultata.split('-')[1];
        let pol = this.unosRezultata.split('-')[2];
        if(mec.zavrsen == 1){
          this.porukaUnos = "Mec je vec zavrsen!";
        }else{
          this.porukaUnos = "Moze se dodati"
          this.rezultatiServis.azurirajRezultatMeca(sport, disciplina, pol, trenMec.brMeca, trenRezultatA, trenRezultatB).subscribe(resp=>{
            console.log(resp);
            this.porukaUnos = "Uspesno dodat rezultat meca!";
            this.rezultatiServis.dohvatiSveMeceve(sport, disciplina, pol).subscribe((vraceniMecevi: Mec[])=>{
              this.mecevi = vraceniMecevi;
            })
          })
        }
      }
    }
  }

  narednaRunda(imeSporta, polZaSport, disciplinaSporta, brojTakmicara){
    if(imeSporta != "Tenis"){
      this.porukaUnos = "Odabrani sport nije tenis!";
      return;
    }else{
      this.porukaUnos = "";
    console.log(imeSporta);
    console.log(polZaSport);
    console.log(disciplinaSporta);
    console.log(brojTakmicara);
    if(brojTakmicara == 4){
      if(this.mecevi.length == 2){
        let nemaDalje = 0;
        for(let i=0; i<this.mecevi.length; i++){
          if(this.mecevi[i].zavrsen == 0){
            nemaDalje = 1;
            break;
          }
        }
        if(nemaDalje == 1){
          this.porukaUnos = "Morate zavrsiti sve meceve prethodne runde!";
        }else{
          let pobednik1: number;
          let pobednik2: number;
          let gubitnik1: number;
          let gubitnik2: number;
          let pobednikSportista1: Sportista;
          let pobednikSportista2: Sportista;
          let gubitnikSportista1: Sportista;
          let gubitnikSportista2: Sportista;
          for(let i=0; i<this.mecevi.length; i++){
            if(this.mecevi[i].brMeca == 1){
              if(this.mecevi[i].rezultatA == 2){
                pobednik1 = this.mecevi[i].mec.takmicarA;
                pobednikSportista1 = this.mecevi[i].mec.sportistaA;
                gubitnik1 = this.mecevi[i].mec.takmicarB;
                gubitnikSportista1 = this.mecevi[i].mec.sportistaB;
              }else{
                pobednik1 = this.mecevi[i].mec.takmicarB;
                pobednikSportista1 = this.mecevi[i].mec.sportistaB;
                gubitnik1 = this.mecevi[i].mec.takmicarA;
                gubitnikSportista1 = this.mecevi[i].mec.sportistaA;
              }
            }
            if(this.mecevi[i].brMeca == 2){
              if(this.mecevi[i].rezultatA == 2){
                pobednik2 = this.mecevi[i].mec.takmicarA;
                pobednikSportista2 = this.mecevi[i].mec.sportistaA;
                gubitnik2 = this.mecevi[i].mec.takmicarB;
                gubitnikSportista2 = this.mecevi[i].mec.sportistaB;
              }else{
                pobednik2 = this.mecevi[i].mec.takmicarB;
                pobednikSportista2 = this.mecevi[i].mec.sportistaB;
                gubitnik2 = this.mecevi[i].mec.takmicarA;
                gubitnikSportista2 = this.mecevi[i].mec.sportistaA;
              }
            }
          }
          let mec1: mecFront = new mecFront();
          let mec2: mecFront = new mecFront();
          mec1.takmicarA = pobednik1;
          mec1.takmicarB = pobednik2;
          mec1.sportistaA = pobednikSportista1;
          mec1.sportistaB = pobednikSportista2;
          mec2.takmicarA = gubitnik1;
          mec2.takmicarB = gubitnik2;
          mec2.sportistaA = gubitnikSportista1;
          mec2.sportistaB = gubitnikSportista2;
          console.log(mec1);
          console.log(mec2);
          this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 3).subscribe((postoji: Mec)=>{
            if(postoji == null){
              this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 3, 0, "Finale").subscribe(resp=>{
                console.log(resp);
                this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 4).subscribe((postoji: Mec)=>{
                  if(postoji == null){
                    this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 4, 0, "Za 3. mesto").subscribe(resp=>{
                      console.log(resp);
                      console.log("Dodao sam meceve!");
                      this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                        this.mecevi = vraceniMecevi;
                      })
                    })
                  }
                })
              })
            }
          })
        }
      }else{
        if(this.zavrsenTenis == 0){
          this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 3).subscribe((postoji: Mec)=>{
            if(postoji){
              if(postoji.rezultatA == 2){
                this.pobednikSportista = postoji.mec.sportistaA;
                this.drugoMestoSportista = postoji.mec.sportistaB;
              }else{
                this.pobednikSportista = postoji.mec.sportistaB;
                this.drugoMestoSportista = postoji.mec.sportistaA;
              }
              this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 4).subscribe((postoji: Mec)=>{
                if(postoji){
                  if(postoji.rezultatA == 2){
                    this.treceMestoSportista = postoji.mec.sportistaA;
                  }else{
                    this.treceMestoSportista = postoji.mec.sportistaB;
                  }
                  this.zavrsenTenis = 1;
                }
                this.azurirajMedalje();
              })
            }
          })
        }
      }
    }else if(brojTakmicara == 8){
      if(this.mecevi.length == 4){
        let nemaDalje = 0;
        for(let i=0; i<this.mecevi.length; i++){
          if(this.mecevi[i].zavrsen == 0){
            nemaDalje = 1;
            break;
          }
        }
        if(nemaDalje == 1){
          this.porukaUnos = "Morate zavrsiti sve meceve prethodne runde!";
        }else{
          let pobednik1: number;
          let pobednik2: number;
          let pobednik3: number;
          let pobednik4: number;
          let sportista1: Sportista;
          let sportista2: Sportista;
          let sportista3: Sportista;
          let sportista4: Sportista;
          for(let i=0; i<this.mecevi.length; i++){
            if(this.mecevi[i].brMeca == 1){
              if(this.mecevi[i].rezultatA == 2){
                pobednik1 = this.mecevi[i].mec.takmicarA;
                sportista1 = this.mecevi[i].mec.sportistaA;
              }else{
                pobednik1 = this.mecevi[i].mec.takmicarB;
                sportista1 = this.mecevi[i].mec.sportistaB;
              }
            }
            if(this.mecevi[i].brMeca == 2){
              if(this.mecevi[i].rezultatA == 2){
                pobednik2 = this.mecevi[i].mec.takmicarA;
                sportista2 = this.mecevi[i].mec.sportistaA;
              }else{
                pobednik2 = this.mecevi[i].mec.takmicarB;
                sportista2 = this.mecevi[i].mec.sportistaB;
              }
            }
            if(this.mecevi[i].brMeca == 3){
              if(this.mecevi[i].rezultatA == 2){
                pobednik3 = this.mecevi[i].mec.takmicarA;
                sportista3 = this.mecevi[i].mec.sportistaA;
              }else{
                pobednik3 = this.mecevi[i].mec.takmicarB;
                sportista3 = this.mecevi[i].mec.sportistaB;
              }
            }
            if(this.mecevi[i].brMeca == 4){
              if(this.mecevi[i].rezultatA == 2){
                pobednik4 = this.mecevi[i].mec.takmicarA;
                sportista4 = this.mecevi[i].mec.sportistaA;
              }else{
                pobednik4 = this.mecevi[i].mec.takmicarB;
                sportista4 = this.mecevi[i].mec.sportistaB;
              }
            }
          }
          let mec1: mecFront = new mecFront();
          let mec2: mecFront = new mecFront();
          mec1.takmicarA = pobednik1;
          mec1.takmicarB = pobednik2;
          mec1.sportistaA = sportista1;
          mec1.sportistaB = sportista2;
          mec2.takmicarA = pobednik3;
          mec2.takmicarB = pobednik4;
          mec2.sportistaA = sportista3;
          mec2.sportistaB = sportista4;
          console.log(mec1);
          console.log(mec2);
          this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 5).subscribe((postoji: Mec)=>{
            if(postoji == null){
              this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 5, 0, "1/2 finale").subscribe(resp=>{
                console.log(resp);
                this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 6).subscribe((postoji: Mec)=>{
                  if(postoji == null){
                    this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 6, 0, "1/2 finale").subscribe(resp=>{
                      console.log(resp);
                      console.log("Dodao sam meceve desnog polukostura!");
                      this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                        this.mecevi = vraceniMecevi;
                      })
                    })
                  }
                })
              })
            }
          })
        }
      }else if(this.mecevi.length == 6){
        let pobednik1: number;
        let pobednik2: number;
        let gubitnik1: number;
        let gubitnik2: number;
        let sportista1: Sportista;
        let sportista2: Sportista;
        let sportistaGubitnik1: Sportista;
        let sportistaGubitnik2: Sportista;
        for(let i=0; i<this.mecevi.length; i++){
          if(this.mecevi[i].brMeca == 5){
            if(this.mecevi[i].rezultatA == 2){
              pobednik1 = this.mecevi[i].mec.takmicarA;
              sportista1 = this.mecevi[i].mec.sportistaA;
              gubitnik1 = this.mecevi[i].mec.takmicarB;
              sportistaGubitnik1 = this.mecevi[i].mec.sportistaB;
            }else{
              pobednik1 = this.mecevi[i].mec.takmicarB;
              sportista1 = this.mecevi[i].mec.sportistaB;
              gubitnik1 = this.mecevi[i].mec.takmicarA;
              sportistaGubitnik1 = this.mecevi[i].mec.sportistaA;
            }
          }
          if(this.mecevi[i].brMeca == 6){
            if(this.mecevi[i].rezultatA == 2){
              pobednik2 = this.mecevi[i].mec.takmicarA;
              sportista2 = this.mecevi[i].mec.sportistaA;
              gubitnik2 = this.mecevi[i].mec.takmicarB;
              sportistaGubitnik2 = this.mecevi[i].mec.sportistaB;
            }else{
              pobednik2 = this.mecevi[i].mec.takmicarB;
              sportista2 = this.mecevi[i].mec.sportistaB;
              gubitnik2 = this.mecevi[i].mec.takmicarA;
              sportistaGubitnik2 = this.mecevi[i].mec.sportistaA;
            }
          }
        }
        let mec1: mecFront = new mecFront();
        let mec2: mecFront = new mecFront();
        mec1.takmicarA = pobednik1;
        mec1.takmicarB = pobednik2;
        mec1.sportistaA = sportista1;
        mec1.sportistaB = sportista2;
        mec2.takmicarA = gubitnik1;
        mec2.takmicarB = gubitnik2;
        mec2.sportistaA = sportistaGubitnik1;
        mec2.sportistaB = sportistaGubitnik2;
        console.log(mec1);
        console.log(mec2);
        this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 7).subscribe((postoji: Mec)=>{
          if(postoji == null){
            this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 7, 0, "Finale").subscribe(resp=>{
              console.log(resp);
              this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 8).subscribe((postoji: Mec)=>{
                if(postoji == null){
                  this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 8, 0, "Za 3.mesto").subscribe(resp=>{
                    console.log(resp);
                    console.log("Dodao sam meceve desnog polukostura!");
                    this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                      this.mecevi = vraceniMecevi;
                    })
                  })
                }
              })
            })
          }
        })
      }else{
        if(this.zavrsenTenis == 0){
          this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 7).subscribe((postoji: Mec)=>{
            if(postoji){
              if(postoji.rezultatA == 2){
                this.pobednikSportista = postoji.mec.sportistaA;
                this.drugoMestoSportista = postoji.mec.sportistaB;
              }else{
                this.pobednikSportista = postoji.mec.sportistaB;
                this.drugoMestoSportista = postoji.mec.sportistaA;
              }
              this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 8).subscribe((postoji: Mec)=>{
                if(postoji){
                  if(postoji.rezultatA == 2){
                    this.treceMestoSportista = postoji.mec.sportistaA;
                  }else{
                    this.treceMestoSportista = postoji.mec.sportistaB;
                  }
                  this.zavrsenTenis = 1;
                }
                this.azurirajMedalje();
              })
            }
          })
        }
      }
    }else{
      if(brojTakmicara == 16){
        if(this.mecevi.length == 8){
          let nemaDalje = 0;
          for(let i=0; i<this.mecevi.length; i++){
            if(this.mecevi[i].zavrsen == 0){
              nemaDalje = 1;
              break;
            }
          }
          if(nemaDalje == 1){
            this.porukaUnos = "Morate zavrsiti sve meceve prethodne runde!";
          }else{
            let pobednik1: number;
            let pobednik2: number;
            let pobednik3: number;
            let pobednik4: number;
            let pobednik5: number;
            let pobednik6: number;
            let pobednik7: number;
            let pobednik8: number;
            let sportista1: Sportista;
            let sportista2: Sportista;
            let sportista3: Sportista;
            let sportista4: Sportista;
            let sportista5: Sportista;
            let sportista6: Sportista;
            let sportista7: Sportista;
            let sportista8: Sportista;
            for(let i=0; i<this.mecevi.length; i++){
              if(this.mecevi[i].brMeca == 1){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik1 = this.mecevi[i].mec.takmicarA;
                  sportista1 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik1 = this.mecevi[i].mec.takmicarB;
                  sportista1 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 2){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik2 = this.mecevi[i].mec.takmicarA;
                  sportista2 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik2 = this.mecevi[i].mec.takmicarB;
                  sportista2 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 3){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik3 = this.mecevi[i].mec.takmicarA;
                  sportista3 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik3 = this.mecevi[i].mec.takmicarB;
                  sportista3 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 4){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik4 = this.mecevi[i].mec.takmicarA;
                  sportista4 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik4 = this.mecevi[i].mec.takmicarB;
                  sportista4 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 5){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik5 = this.mecevi[i].mec.takmicarA;
                  sportista5 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik5 = this.mecevi[i].mec.takmicarB;
                  sportista5 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 6){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik6 = this.mecevi[i].mec.takmicarA;
                  sportista6 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik6 = this.mecevi[i].mec.takmicarB;
                  sportista6 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 7){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik7 = this.mecevi[i].mec.takmicarA;
                  sportista7 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik7 = this.mecevi[i].mec.takmicarB;
                  sportista7 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 8){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik8 = this.mecevi[i].mec.takmicarA;
                  sportista8 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik8 = this.mecevi[i].mec.takmicarB;
                  sportista8 = this.mecevi[i].mec.sportistaB;
                }
              }
            }
            let mec1: mecFront = new mecFront();
            let mec2: mecFront = new mecFront();
            let mec3: mecFront = new mecFront();
            let mec4: mecFront = new mecFront();
            mec1.takmicarA = pobednik1;
            mec1.takmicarB = pobednik2;
            mec1.sportistaA = sportista1;
            mec1.sportistaB = sportista2;
            mec2.takmicarA = pobednik3;
            mec2.takmicarB = pobednik4;
            mec2.sportistaA = sportista3;
            mec2.sportistaB = sportista4;
            mec3.takmicarA = pobednik5;
            mec3.takmicarB = pobednik6;
            mec3.sportistaA = sportista5;
            mec3.sportistaB = sportista6;
            mec4.takmicarA = pobednik7;
            mec4.takmicarB = pobednik8;
            mec4.sportistaA = sportista7;
            mec4.sportistaB = sportista8;
            console.log(mec1);
            console.log(mec2);
            console.log(mec3);
            console.log(mec4);
            this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 9).subscribe((postoji: Mec)=>{
              if(postoji == null){
                this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 9, 0, "1/4 finale").subscribe(resp=>{
                  console.log(resp);
                  this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 10).subscribe((postoji: Mec)=>{
                    if(postoji == null){
                      this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 10, 0, "1/4 finale").subscribe(resp=>{
                        console.log(resp);
                        this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 11).subscribe((postoji: Mec)=>{
                          if(postoji == null){
                            this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec3, 0, 0, 11, 0, "1/4 finale").subscribe(resp=>{
                              console.log(resp);
                              this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 12).subscribe((postoji: Mec)=>{
                                if(postoji == null){
                                  this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec4, 0, 0, 12, 0, "1/4 finale").subscribe(resp=>{
                                    console.log(resp);
                                    console.log("Dodao sam meceve!");
                                    this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                                      this.mecevi = vraceniMecevi;
                                    })
                                  })
                                }
                              })
                            })
                          }
                        })
                      })
                    }
                  })
                })
              }
            })
          }
        }else if(this.mecevi.length == 12){
          let nemaDalje = 0;
          for(let i=0; i<this.mecevi.length; i++){
            if(this.mecevi[i].zavrsen == 0){
              nemaDalje = 1;
              break;
            }
          }
          if(nemaDalje == 1){
            this.porukaUnos = "Morate zavrsiti sve meceve prethodne runde!";
          }else{
            let pobednik1: number;
            let pobednik2: number;
            let pobednik3: number;
            let pobednik4: number;
            let sportista1: Sportista;
            let sportista2: Sportista;
            let sportista3: Sportista;
            let sportista4: Sportista;
            for(let i=0; i<this.mecevi.length; i++){
              if(this.mecevi[i].brMeca == 9){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik1 = this.mecevi[i].mec.takmicarA;
                  sportista1 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik1 = this.mecevi[i].mec.takmicarB;
                  sportista1 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 10){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik2 = this.mecevi[i].mec.takmicarA;
                  sportista2 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik2 = this.mecevi[i].mec.takmicarB;
                  sportista2 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 11){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik3 = this.mecevi[i].mec.takmicarA;
                  sportista3 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik3 = this.mecevi[i].mec.takmicarB;
                  sportista3 = this.mecevi[i].mec.sportistaB;
                }
              }
              if(this.mecevi[i].brMeca == 12){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik4 = this.mecevi[i].mec.takmicarA;
                  sportista4 = this.mecevi[i].mec.sportistaA;
                }else{
                  pobednik4 = this.mecevi[i].mec.takmicarB;
                  sportista4 = this.mecevi[i].mec.sportistaB;
                }
              }
            }
            let mec1: mecFront = new mecFront();
            let mec2: mecFront = new mecFront();
            mec1.takmicarA = pobednik1;
            mec1.takmicarB = pobednik2;
            mec1.sportistaA = sportista1;
            mec1.sportistaB = sportista2;
            mec2.takmicarA = pobednik3;
            mec2.takmicarB = pobednik4;
            mec2.sportistaA = sportista3;
            mec2.sportistaB = sportista4;
            console.log(mec1);
            console.log(mec2);
            this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 13).subscribe((postoji: Mec)=>{
              if(postoji == null){
                this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 13, 0, "1/2 finale").subscribe(resp=>{
                  console.log(resp);
                  this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 14).subscribe((postoji: Mec)=>{
                    if(postoji == null){
                      this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 14, 0, "1/2 finale").subscribe(resp=>{
                        console.log(resp);
                        console.log("Dodao sam meceve!");
                        this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                          this.mecevi = vraceniMecevi;
                        })
                      })
                    }
                  })
                })
              }
            })
          }
        }else if(this.mecevi.length == 14){
          let nemaDalje = 0;
          for(let i=0; i<this.mecevi.length; i++){
            if(this.mecevi[i].zavrsen == 0){
              nemaDalje = 1;
              break;
            }
          }
          if(nemaDalje == 1){
            this.porukaUnos = "Morate zavrsiti sve meceve prethodne runde!";
          }else{
            let pobednik1: number;
            let pobednik2: number;
            let gubitnik1: number;
            let gubitnik2: number;
            let sportista1: Sportista;
            let sportista2: Sportista;
            let sportistaGubitnik1: Sportista;
            let sportistaGubitnik2: Sportista;
            for(let i=0; i<this.mecevi.length; i++){
              if(this.mecevi[i].brMeca == 13){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik1 = this.mecevi[i].mec.takmicarA;
                  sportista1 = this.mecevi[i].mec.sportistaA;
                  gubitnik1 = this.mecevi[i].mec.takmicarB;
                  sportistaGubitnik1 = this.mecevi[i].mec.sportistaB;
                }else{
                  pobednik1 = this.mecevi[i].mec.takmicarB;
                  sportista1 = this.mecevi[i].mec.sportistaB;
                  gubitnik1 = this.mecevi[i].mec.takmicarA;
                  sportistaGubitnik1 = this.mecevi[i].mec.sportistaA;
                }
              }
              if(this.mecevi[i].brMeca == 14){
                if(this.mecevi[i].rezultatA == 2){
                  pobednik2 = this.mecevi[i].mec.takmicarA;
                  sportista2 = this.mecevi[i].mec.sportistaA;
                  gubitnik2 = this.mecevi[i].mec.takmicarB;
                  sportistaGubitnik2 = this.mecevi[i].mec.sportistaB;
                }else{
                  pobednik2 = this.mecevi[i].mec.takmicarB;
                  sportista2 = this.mecevi[i].mec.sportistaB;
                  gubitnik2 = this.mecevi[i].mec.takmicarA;
                  sportistaGubitnik2 = this.mecevi[i].mec.sportistaA;
                }
              }
            }
            let mec1: mecFront = new mecFront();
            let mec2: mecFront = new mecFront();
            mec1.takmicarA = pobednik1;
            mec1.takmicarB = pobednik2;
            mec1.sportistaA = sportista1;
            mec1.sportistaB = sportista2;
            mec2.takmicarA = gubitnik1;
            mec2.takmicarB = gubitnik2;
            mec2.sportistaA = sportistaGubitnik1;
            mec2.sportistaB = sportistaGubitnik2;
            console.log(mec1);
            console.log(mec2);
            this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 15).subscribe((postoji: Mec)=>{
              if(postoji == null){
                this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec1, 0, 0, 15, 0, "Finale").subscribe(resp=>{
                  console.log(resp);
                  this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 16).subscribe((postoji: Mec)=>{
                    if(postoji == null){
                      this.rezultatiServis.dodajMec(imeSporta, disciplinaSporta, polZaSport, mec2, 0, 0, 16, 0, "Za 3.mesto").subscribe(resp=>{
                        console.log(resp);
                        console.log("Dodao sam meceve!");
                        this.rezultatiServis.dohvatiSveMeceve(imeSporta, disciplinaSporta, polZaSport).subscribe((vraceniMecevi: Mec[])=>{
                          this.mecevi = vraceniMecevi;
                        })
                      })
                    }
                  })
                })
              }
            })
          }
        }else{
          if(this.zavrsenTenis == 0){
            this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 15).subscribe((postoji: Mec)=>{
              if(postoji){
                if(postoji.rezultatA == 2){
                  this.pobednikSportista = postoji.mec.sportistaA;
                  this.drugoMestoSportista = postoji.mec.sportistaB;
                }else{
                  this.pobednikSportista = postoji.mec.sportistaB;
                  this.drugoMestoSportista = postoji.mec.sportistaA;
                }
                this.rezultatiServis.daLiPostojiMec(imeSporta, disciplinaSporta, polZaSport, 16).subscribe((postoji: Mec)=>{
                  if(postoji){
                    if(postoji.rezultatA == 2){
                      this.treceMestoSportista = postoji.mec.sportistaA;
                    }else{
                      this.treceMestoSportista = postoji.mec.sportistaB;
                    }
                    this.zavrsenTenis = 1;
                  }
                  this.azurirajMedalje();
                })
              }
            })
          }
        }
      }
    }
    }
  }

  zavrsenTenis: number = 0;

  dohvatiDelegatovaTakmicenja(delegat){
    this.takmicenjaServis.dohvatiDelegatovaTakmicenja(delegat).subscribe((data: Takmicenje[])=>{
      console.log(data);
      this.mojaTakmicenja = data;
    })
  }

  proveraPolja(datum, vreme):boolean{
    if(datum == null || vreme == null){
      return true;
    }else{
      return false;
    }
  }

  odabraneLokacije: String[] = [];
  potencijalniPreklopi: Takmicenje[] = [];
  porukaDatum: string;

  dodajRaspored(sport, disciplina, pol, tip, lokacije, index){
    console.log(sport);
    console.log(disciplina);
    console.log(pol);
    console.log(tip);
    //console.log(lokacije);
    for(let i=0; i<lokacije.length; i++){
      this.odabraneLokacije.push(lokacije[i]);
    }
    console.log(this.odabraneLokacije);
    console.log(this.datumPocetka[index]);
    console.log(this.vremePocetka[index]);
    if(this.proveraPolja(this.datumPocetka[index], this.vremePocetka[index]) == true){
      this.porukaDatum = "Morate odabrati datum i vreme!";
    }else{
      let trenTakmicenje: Takmicenje;
      for(let i=0; i<this.mojaTakmicenja.length; i++){
        if(this.mojaTakmicenja[i].sport == sport && this.mojaTakmicenja[i].disciplina == disciplina && this.mojaTakmicenja[i].pol == pol && this.mojaTakmicenja[i].tip == tip){
          trenTakmicenje = this.mojaTakmicenja[i];
        }
      }
      let pocetak = trenTakmicenje.datumPocetka;
      let kraj = trenTakmicenje.datumKraja;
      console.log(pocetak);
      console.log(kraj)
      let start: Date;
      let end: Date;
      let trenDatum: Date;
      let pocetakNiz: string[] = [];
      let krajNiz: string[] = [];
      let trenNiz: string[] = [];
      pocetakNiz = pocetak.split('-');
      krajNiz = kraj.split('-');
      trenNiz = this.datumPocetka[index].split('-');
      console.log(pocetakNiz);
      console.log(krajNiz);
      console.log(trenNiz);
      start = new Date(parseInt(pocetakNiz[0]), parseInt(pocetakNiz[1])-1, parseInt(pocetakNiz[2]));
      console.log(start);
      end = new Date(parseInt(krajNiz[0]), parseInt(krajNiz[1])-1, parseInt(krajNiz[2]));
      console.log(end);
      trenDatum = new Date(parseInt(trenNiz[0]), parseInt(trenNiz[1])-1, parseInt(trenNiz[2]));
      console.log(trenDatum);
      if(start.getTime() > trenDatum.getTime() || end.getTime() < trenDatum.getTime()){
        console.log("Greska")
        this.porukaDatum = "Datum mora biti u opsegu od: " + pocetak + " do: " + kraj;
        console.log(this.porukaDatum)
      }else{
        this.takmicenjaServis.proveriPreklapanja(this.datumPocetka[index], this.vremePocetka[index]).subscribe((data: Takmicenje[])=>{
          if(data == null){
            this.dodajDatumIVreme(sport, disciplina, pol, tip, index);
            alert("Nema preklapanja, uspesno dodato!");
            this.porukaDatum = "";
            this.ruter.navigate(['delegat']);
          }else{
            this.potencijalniPreklopi = data;
            console.log(this.potencijalniPreklopi);
            this.proveriPreklop(sport, disciplina, pol, tip, index);
          }
        })
      }
    }
  }

  proveriPreklop(sport, disciplina, pol, tip, index){
    let imaPreklop = 0;
    for(let i=0; i<this.odabraneLokacije.length; i++){
      for(let j=0; j<this.potencijalniPreklopi.length; j++){
        for(let k=0; k<this.potencijalniPreklopi[j].lokacije.length; k++){
          if(this.odabraneLokacije[i] == this.potencijalniPreklopi[j].lokacije[k]){
            imaPreklop = 1;
          }
        }
      }
    }
    console.log(imaPreklop);
    if(imaPreklop == 1){
      this.porukaDatum = "Odaberite novi datum i vreme, doslo je do preklopa!";
    }else{
      this.takmicenjaServis.dodajDatumIVreme(sport, disciplina, pol, tip, this.datumPocetka[index], this.vremePocetka[index]).subscribe(resp=>{
        console.log(resp);
        this.dohvatiDelegatovaTakmicenja(this.mojDelegat);
        this.porukaDatum = "";
        alert("Uspesno dodat datum i vreme!");
        this.ruter.navigate(['delegat']);
      })
    }
  }

  dodajDatumIVreme(sport, disciplina, pol, tip, index){
    this.takmicenjaServis.dodajDatumIVreme(sport, disciplina, pol, tip, this.datumPocetka[index], this.vremePocetka[index]).subscribe(resp=>{
      console.log(resp);
      this.dohvatiDelegatovaTakmicenja(this.mojDelegat);
      this.porukaDatum = "";
      alert("Uspesno dodat datum i vreme!");
      this.ruter.navigate(['delegat']);
    })
  }

  takmicari: number[] = [];
  sportistiNaTakmicenju: Sportista[] = [];
  trenutniFormat: Format;
  imeSporta: string = "";
  disciplinaSporta: string = "";
  polZaSport: string = "";

  zavrsenUnosZaTakmicara: number[] = [];
  brUnetihRundiPoTakmicaru: number[] = [];
  rezultatiPoTakmicaru: String[] = [];

  vratiUcesnike(){
    this.zavrsenUnosZaTakmicara = [];
    this.brUnetihRundiPoTakmicaru = [];
    this.rezultatiPoTakmicaru = [];
    this.brUnetihRepesaza = 0;
    this.porukaUnos = "";
    this.pobednik = null;
    this.drugoMesto = null;
    this.treceMesto = null;
    this.sportistiNaTakmicenju = [];
    this.zavrsenTenis = 0;
    this.traziSeTenis = 0;
    if(this.unosRezultata.split('-')[0] != "Tenis"){
      this.sportistiNaTakmicenju = [];
      console.log(this.unosRezultata);
      if(this.unosRezultata != null || (this.unosRezultata != null && this.unosRezultata != "Odaberi takmicenje")){
        this.imeSporta = this.unosRezultata.split("-")[0];
        this.disciplinaSporta = this.unosRezultata.split("-")[1];
        this.polZaSport = this.unosRezultata.split("-")[2];
        console.log(this.imeSporta);
        console.log(this.disciplinaSporta);
        console.log(this.polZaSport);
        for(let i=0; i<this.mojaTakmicenja.length; i++){
          if(this.mojaTakmicenja[i].sport == this.imeSporta && this.mojaTakmicenja[i].disciplina == this.disciplinaSporta && this.mojaTakmicenja[i].pol == this.polZaSport){
            this.takmicari = this.mojaTakmicenja[i].takmicari;
          }
        }
        console.log(this.takmicari);
      }
      if(this.takmicari.length > 0){
        for(let i=0; i<this.takmicari.length; i++){
          let broj = this.takmicari[i];
          this.sportistiServis.dohvatiSportistu(broj).subscribe((member: Sportista)=>{
            this.sportistiNaTakmicenju.push(member);
          })
        }
      }
      console.log(this.sportistiNaTakmicenju);
      this.dohvatiSvimaDosadanjeRezultate();
      console.log(this.dosadasnjiRezultati);
      this.formatServis.dohvatiFormat(this.imeSporta, this.disciplinaSporta).subscribe((data: Format)=>{
        this.trenutniFormat = data;
        console.log(this.trenutniFormat);
        this.zavrsenUnosZaTakmicara = [];
        this.brUnetihRundiPoTakmicaru = [];
        this.rezultatiPoTakmicaru = [];
        for(let i=0; i<this.takmicari.length; i++){
          this.zavrsenUnosZaTakmicara.push(0);
          this.brUnetihRundiPoTakmicaru.push(0);
          this.rezultatiPoTakmicaru.push("");
        }
        console.log(this.zavrsenUnosZaTakmicara);
        console.log(this.brUnetihRundiPoTakmicaru);
        console.log(this.rezultatiPoTakmicaru);
      })
    }else{
      this.porukaUnos = "Morate formirati kostur takmicenja!";
    }
  }

  dohvatiSvimaDosadanjeRezultate(){
    this.rezultatiServis.dohvatiSveRezultate().subscribe((data: Rezultat[])=>{
      for(let i=0; i<data.length; i++){
        if(data[i].sport == this.imeSporta && data[i].disciplina == this.disciplinaSporta && data[i].pol == this.polZaSport){
          this.dosadasnjiRezultati.push(data[i]);
        }
      }
    })
  }

  rezultat: String[] = [];
  porukaUnos: string;
  dosadasnjiRezultati: Rezultat[] = [];
  rezultatiOdZnacaja: Rezultat[] = [];
  trenutniRezultat: Rezultat;
  traziSeTenis: number = 0;

  unesiRezultat(idSportiste, imeSporta, disciplinaSporta, polZaSport, imeIPrezime, nacionalnost, j){
    if((this.rezultat[j] == null) || (this.rezultat[j] != null && this.rezultat[j] == "")){
      this.porukaUnos = "Morate uneti rezultat!";
    }else{
      console.log(idSportiste);
      console.log(imeSporta);
      console.log(disciplinaSporta);
      console.log(polZaSport);
      console.log(imeIPrezime);
      console.log(nacionalnost);
      console.log(this.rezultat[j]);
      let niz: String[] = [];
      niz = this.rezultat[j].split(/\W+/);
      for(let m=0; m<niz.length; m++){
        console.log(niz[m]);
      }
      console.log(j);
      this.rezultatiServis.daLiPostojiRezultat(idSportiste, imeSporta, disciplinaSporta, polZaSport).subscribe((data: Rezultat)=>{
        if(data == null){
          this.porukaUnos = "Novi rezultat!";
          this.rezultatiServis.kreirajRezultat(parseInt(idSportiste), imeSporta, disciplinaSporta, polZaSport, this.rezultat[j], "", 0, 0).subscribe(resp=>{
            console.log(resp);
            this.porukaUnos = "Uspesno dodat prvi rezultat!";
            this.brUnetihRundiPoTakmicaru[j] = this.brUnetihRundiPoTakmicaru[j] + 1;
            this.rezultatiPoTakmicaru[j] = this.rezultat[j];
            if(this.brUnetihRundiPoTakmicaru[j] == this.trenutniFormat.brRundi){
              this.zavrsenUnosZaTakmicara[j] = 1;
            }
            this.dohvatiSvimaDosadanjeRezultate();
            for(let i=0; i<this.sportistiNaTakmicenju.length; i++){
              for(let j=0; j<this.dosadasnjiRezultati.length; j++){
                if(this.sportistiNaTakmicenju[i].idSportiste == this.dosadasnjiRezultati[j].takmicar){
                  this.rezultatiOdZnacaja.push(this.dosadasnjiRezultati[j]);
                }
              }
            }
          })
        }else{
          if(this.trenutniFormat.brRundi > data.results.length){
            this.porukaUnos = "Moze se uneti runda";
            this.trenutniRezultat = data;
            if(this.proveraBrojaRundiKodOstalih(idSportiste, imeSporta, disciplinaSporta, polZaSport) == true){
              this.porukaUnos = "Tu sam!";
              this.rezultatiServis.azurirajRezultat(parseInt(idSportiste), imeSporta, disciplinaSporta, polZaSport, this.rezultat[j]).subscribe(response=>{
                console.log(response);
                this.porukaUnos = "Uspesno dodat rezultat runde!";
                this.brUnetihRundiPoTakmicaru[j] = this.brUnetihRundiPoTakmicaru[j] + 1;
                this.rezultatiPoTakmicaru[j] = this.rezultatiPoTakmicaru[j]+ " " + this.rezultat[j];
                if(this.brUnetihRundiPoTakmicaru[j] == this.trenutniFormat.brRundi){
                  this.zavrsenUnosZaTakmicara[j] = 1;
                }
                this.dohvatiSvimaDosadanjeRezultate();
                for(let i=0; i<this.sportistiNaTakmicenju.length; i++){
                  for(let j=0; j<this.dosadasnjiRezultati.length; j++){
                    if(this.sportistiNaTakmicenju[i].idSportiste == this.dosadasnjiRezultati[j].takmicar){
                      this.rezultatiOdZnacaja.push(this.dosadasnjiRezultati[j]);
                    }
                  }
                }
              })
            }else{
              this.porukaUnos = "Unos prethodne runde nije zavrsen!";
            }
          }else{
            //this.prikazatiDugmeZavrsetka = 1;
            this.porukaUnos = "Za dati sport i disciplinu postoji tacno: " + this.trenutniFormat.brRundi + " runda!";
          }
        }
      })
    }
  }

  //prikazatiDugmeZavrsetka: number = 0;
  nemaIspis: number = 0;

  proveraBrojaRundiKodOstalih(mojID, sport, disciplina, pol): boolean{
    let greska: number = 0;
    let faliRezultat: Array<number> = [];
    let nemogucUnosNaredneRunde: number = 0;
    for(let i=0; i<this.sportistiNaTakmicenju.length; i++){
      faliRezultat.push(1);
    }
    console.log(faliRezultat);
    for(let i=0; i<this.sportistiNaTakmicenju.length; i++){
      for(let j=0; j<this.dosadasnjiRezultati.length; j++){
        if(this.sportistiNaTakmicenju[i].idSportiste == this.dosadasnjiRezultati[j].takmicar){
          this.rezultatiOdZnacaja.push(this.dosadasnjiRezultati[j]);
          faliRezultat[i] = 0;
        }
      }
    }
    console.log(faliRezultat);
    console.log(this.rezultatiOdZnacaja);
    if(faliRezultat.includes(1)){
      greska = 1;
      console.log("Doslo je do greske!");
    }else{
      for(let i=0; i<this.rezultatiOdZnacaja.length; i++){
        if(this.rezultatiOdZnacaja[i].results.length - this.trenutniRezultat.results.length < 0){
          nemogucUnosNaredneRunde = 1;
          greska = 1;
          console.log("Morate prvo svima uneti prethodnu rundu!");
        }
      }
    }
    if(greska == 1){
      return false;
    }else{
      return true;
    }
  }

  frontRezultati: RezultatFront[] = [];

  zavrsi(sport, disciplina, pol){
    this.rezultatiRepesaz = [];
    this.rezultatiRepesazFront = [];
    this.rezultatiOdZnacaja = [];
    this.dosadasnjiRezultati = [];
    let greska: number;
    greska = 0;
    console.log(sport);
    console.log(disciplina);
    console.log(pol);
    this.rezultatiServis.dohvatiRezultate(sport, disciplina, pol).subscribe((data: Rezultat[])=>{
      this.rezultatiOdZnacaja = data;
      console.log(this.rezultatiOdZnacaja);
      for(let i=0; i<this.rezultatiOdZnacaja.length; i++){
        if(this.trenutniFormat.brRundi > this.rezultatiOdZnacaja[i].results.length){
          greska = 1;
          break;
        }
      }
      console.log(this.trenutniFormat);
      console.log(this.rezultatiOdZnacaja);
      console.log("Greska je; ");
      console.log(greska);
      if(greska == 1){
        this.porukaUnos = "Morate uneti tacno: " + this.trenutniFormat.brRundi + " rundi!";
      }else{
        console.log("Tu sam")
        console.log(sport);
        console.log(disciplina);
        console.log(pol);
        for(let i=0; i<this.rezultatiOdZnacaja.length; i++){
          for(let j=0; j<this.rezultatiOdZnacaja[i].results.length; j++){
            let front: RezultatFront = new RezultatFront();
            front.sport = sport;
            front.disciplina = disciplina;
            front.pol = pol;
            front.takmicar = this.rezultatiOdZnacaja[i].takmicar;
            front.result = this.rezultatiOdZnacaja[i].results[j];
            this.frontRezultati.push(front);
          }
        }
        console.log(this.frontRezultati);
        for(let i=0; i<this.frontRezultati.length; i++){
          let niz: string[] = [];
          let formatKarakteristike: String[] = [];
          niz = this.frontRezultati[i].result.split(/\W+/);
          formatKarakteristike = this.trenutniFormat.format.split(/\W+/);
          //console.log(formatKarakteristike);
          if(formatKarakteristike[formatKarakteristike.length-1] == "TT" || formatKarakteristike[formatKarakteristike.length-1] == "SS"){
            this.porukaUnos = "Merim vremenski!";
            if(formatKarakteristike[formatKarakteristike.length-1] == "TT"){
              this.frontRezultati[i].rezultat = parseInt(niz[0])*60 + parseInt(niz[1]);
            }else{
              if(niz.length == 3){
                this.frontRezultati[i].rezultat = parseInt(niz[0])*3600 + parseInt(niz[1])*60 + parseInt(niz[2]);
              }else{
                this.frontRezultati[i].rezultat = parseInt(niz[0])*60 + parseInt(niz[1]);
              }
            }
          }else if(formatKarakteristike[formatKarakteristike.length-1] == "CM"){
            this.porukaUnos = "Merim razdaljinu";
            this.frontRezultati[i].rezultat = parseInt(niz[0])*100 + parseInt(niz[1]);
          }else if(this.trenutniFormat.format == "A:B"){
            this.porukaUnos = "A:B";
          }else{
            this.porukaUnos = "Poeni"
            this.frontRezultati[i].rezultat = parseInt(this.frontRezultati[i].result);
          }
        }
        this.sortirajRezultate();
        console.log(this.frontRezultati);
        let prviRez: string;
        let drugiRez: string;
        let treciRez: string;
        prviRez = this.frontRezultati[0].result;
        for(let i=1; i<this.frontRezultati.length; i++){
          if(this.frontRezultati[i].result != prviRez){
            drugiRez = this.frontRezultati[i].result;
            break;
          }
        }
        for(let i=1; i<this.frontRezultati.length; i++){
          if(this.frontRezultati[i].result != prviRez && this.frontRezultati[i].result != drugiRez){
            treciRez = this.frontRezultati[i].result;
            break;
          }
        }
        console.log(prviRez);
        console.log(drugiRez);
        console.log(treciRez);
        this.rezultatiServis.dohvatiOveRezultate(prviRez).subscribe((data: Rezultat[])=>{
          if(data.length > 1){
            for(let i=0; i<data.length; i++){
              if(data[i].sport == sport && data[i].disciplina == disciplina && data[i].pol == pol){
                data[i].trebaRepesaz = 1;
                this.rezultatiRepesaz.push(data[i]);
              }
            }
          }
          this.rezultatiServis.dohvatiOveRezultate(drugiRez).subscribe((data: Rezultat[])=>{
            if(data.length > 1){
              for(let i=0; i<data.length; i++){
                if(data[i].sport == sport && data[i].disciplina == disciplina && data[i].pol == pol){
                  data[i].trebaRepesaz = 1;
                  this.rezultatiRepesaz.push(data[i]);
                }
              }
            }
            this.rezultatiServis.dohvatiOveRezultate(treciRez).subscribe((data: Rezultat[])=>{
              if(data.length > 1){
                for(let i=0; i<data.length; i++){
                  if(data[i].sport == sport && data[i].disciplina == disciplina && data[i].pol == pol){
                    data[i].trebaRepesaz = 1;
                    this.rezultatiRepesaz.push(data[i]);
                  }
                }
              }
              console.log(this.rezultatiRepesaz);
              if(this.rezultatiRepesaz != null && this.rezultatiRepesaz.length > 0){
                for(let i=0; i<this.rezultatiRepesaz.length; i++){
                  let rez = new RezultatFront();
                  rez.sport = sport;
                  rez.disciplina = disciplina;
                  rez.pol = pol;
                  rez.takmicar = this.rezultatiRepesaz[i].takmicar;
                  this.rezultatiRepesazFront.push(rez);
                }
                for(let i=0; i<this.rezultatiRepesazFront.length; i++){
                  this.rezultatiRepesazFront[i].takmicarPersonalizovan = new Sportista();
                  this.sportistiServis.dohvatiSportistu(this.rezultatiRepesazFront[i].takmicar).subscribe((clan: Sportista)=>{
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.idSportiste = clan.idSportiste;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.imeIPrezime = clan.imeIPrezime;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.nacionalnost = clan.nacionalnost;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.medalja = clan.medalja;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.discipline = clan.discipline;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.pol = clan.pol;
                    this.rezultatiRepesazFront[i].takmicarPersonalizovan.sport = clan.sport;
                  })
                }
                this.prikaziRezultate = 1;
              }else{
                console.log("Tu sam!");
                console.log(this.frontRezultati);
                this.pobednik = this.frontRezultati[0];
                for(let i=1; i<this.frontRezultati.length; i++){
                  if(this.frontRezultati[i].takmicar != this.pobednik.takmicar){
                    this.drugoMesto = this.frontRezultati[i];
                    break;
                  }
                }
                for(let i=1; i<this.frontRezultati.length; i++){
                  if((this.frontRezultati[i].takmicar != this.pobednik.takmicar) && (this.frontRezultati[i].takmicar != this.drugoMesto.takmicar)){
                    this.treceMesto = this.frontRezultati[i];
                    break;
                  }
                }
                console.log(this.pobednik);
                console.log(this.drugoMesto);
                console.log(this.treceMesto);
                this.zavrseno = 1;
                this.nemaIspis = 1;
                this.pobednikSportista = this.pobednik.takmicarPersonalizovan;
                this.drugoMestoSportista = this.drugoMesto.takmicarPersonalizovan;
                this.treceMestoSportista = this.treceMesto.takmicarPersonalizovan;
                console.log(this.pobednikSportista);
                console.log(this.drugoMestoSportista);
                console.log(this.treceMestoSportista);
                this.azurirajMedalje();
              }
            })
          })
        })
      }
    })
  }

  rezultatiRepesaz: Rezultat[] = [];
  rezultatiRepesazFront: RezultatFront[] = [];
  repesazi: string[] = [];

  unesiRepesaz(takmicar, imeSporta, disciplinaSporta, polZaSport, nacionalnost, m){
    console.log(takmicar);
    console.log(imeSporta);
    console.log(disciplinaSporta);
    console.log(polZaSport);
    console.log(nacionalnost);
    console.log(this.repesazi[m]);
    let trenFormInfo: string[] = [];
    trenFormInfo = this.trenutniFormat.format.split(/\W+/);
    console.log(trenFormInfo);
    let trenRepesaz: string[] = [];
    trenRepesaz = this.repesazi[m].split(/\W+/);
    let br: number;
    if(trenFormInfo[trenFormInfo.length-1] == "TT" || trenFormInfo[trenFormInfo.length-1] == "SS"){
      this.porukaUnos = "Merim vremenski!";
      if(trenFormInfo[trenFormInfo.length-1] == "TT"){
        br = parseInt(trenRepesaz[0])*60 + parseInt(trenRepesaz[1]);
      }else{
        if(trenRepesaz.length == 3){
          br = parseInt(trenRepesaz[0])*3600 + parseInt(trenRepesaz[1])*60 + parseInt(trenRepesaz[2]);
        }else{
          br = parseInt(trenRepesaz[0])*60 + parseInt(trenRepesaz[1]);
        }
      }
    }else if(trenFormInfo[trenFormInfo.length-1] == "CM"){
      this.porukaUnos = "Merim razdaljinu";
      br = parseInt(trenRepesaz[0])*100 + parseInt(trenRepesaz[1]);
    }else if(this.trenutniFormat.format == "A:B"){
      this.porukaUnos = "A:B";
    }else{
      this.porukaUnos = "Poeni"
      br = parseInt(trenRepesaz[0]);
    }
    console.log(br);
    this.rezultatiServis.postaviRepesaz(takmicar, imeSporta, disciplinaSporta, polZaSport, this.repesazi[m], br).subscribe(resp=>{
      console.log(resp);
      this.brUnetihRepesaza = this.brUnetihRepesaza + 1;
    })
  }

  brUnetihRepesaza: number;

  zavrsiRepesaz(imeSporta, polZaSport, disciplinaSporta){
    /* let greska: number = 0;
    for(let i=0; i<this.rezultatiRepesaz.length; i++){
      if(this.rezultatiRepesaz[i].repesaz == ""){
        greska = 1;
        break;
      }
    } */
    if(this.brUnetihRepesaza < this.rezultatiRepesaz.length){
      this.porukaUnos = "Morate uneti sve repesaze!"
    }else{
      this.rezultatiServis.dohvatiRezultate(imeSporta, disciplinaSporta, polZaSport).subscribe((data: Rezultat[])=>{
        this.rezultatiOdZnacaja = data;
        console.log(data);
        for(let i=0; i<this.rezultatiOdZnacaja.length; i++){
          for(let j=0; j<this.rezultatiOdZnacaja[i].results.length; j++){
            let rep = new RepesazFront();
            rep.sport = imeSporta;
            rep.disciplina = disciplinaSporta;
            rep.pol = polZaSport;
            rep.takmicar = this.rezultatiOdZnacaja[i].takmicar;
            rep.result = this.rezultatiOdZnacaja[i].results[j];
            let trenFormInfo: string[] = [];
            trenFormInfo = this.trenutniFormat.format.split(/\W+/);
            console.log(trenFormInfo);
            let br: number;
            let trRez: string[] = [];
            trRez = this.rezultatiOdZnacaja[i].results[j].split(/\W+/);
            if(trenFormInfo[trenFormInfo.length-1] == "TT" || trenFormInfo[trenFormInfo.length-1] == "SS"){
              this.porukaUnos = "Merim vremenski!";
              if(trenFormInfo[trenFormInfo.length-1] == "TT"){
                br = parseInt(trRez[0])*60 + parseInt(trRez[1]);
              }else{
                if(trRez.length == 3){
                  br = parseInt(trRez[0])*3600 + parseInt(trRez[1])*60 + parseInt(trRez[2]);
                }else{
                  br = parseInt(trRez[0])*60 + parseInt(trRez[1]);
                }
              }
            }else if(trenFormInfo[trenFormInfo.length-1] == "CM"){
              this.porukaUnos = "Merim razdaljinu";
              br = parseInt(trRez[0])*100 + parseInt(trRez[1]);
            }else if(this.trenutniFormat.format == "A:B"){
              this.porukaUnos = "A:B";
            }else{
              this.porukaUnos = "Poeni"
              br = parseInt(trRez[0]);
            }
            rep.rezultat = br;
            rep.repesaz = this.rezultatiOdZnacaja[i].repesaz;
            rep.repesazBroj = this.rezultatiOdZnacaja[i].repesazBroj;
            this.repesaziFront.push(rep);
          }
        }
        for(let i=0; i<this.repesaziFront.length; i++){
          this.sportistiServis.dohvatiSportistu(this.repesaziFront[i].takmicar).subscribe((data: Sportista)=>{
            this.repesaziFront[i].takmicarPersonalizovan = data;
          })
        }
        console.log(this.repesaziFront);
        if(this.trenutniFormat.ManjeVece == 1){
          this.repesaziFront.sort((b,a)=>{
            let rezultatA = a.rezultat;
            let rezultatB = b.rezultat;
            if(rezultatB - rezultatA == 0){
              let repA = a.repesazBroj;
              let repB = b.repesazBroj;
              return repB - repA;
            }else{
              return rezultatB - rezultatA;
            }
          })
        }else{
          this.repesaziFront.sort((a,b)=>{
            let rezultatA = a.rezultat;
            let rezultatB = b.rezultat;
            if(rezultatB - rezultatA == 0){
              let repA = a.repesazBroj;
              let repB = b.repesazBroj;
              return repB - repA;
            }else{
              return rezultatB - rezultatA;
            }
          })
        }
        console.log(this.repesaziFront);
        this.pobednikRepesaz = this.repesaziFront[0];
        this.drugoMestoRepesaz = this.repesaziFront[1];
        this.treceMestoRepesaz = this.repesaziFront[2];
        this.pobednikSportista = null;
        this.drugoMestoSportista = null;
        this.treceMestoSportista = null;
        this.sportistiServis.dohvatiSportistu(this.pobednikRepesaz.takmicar).subscribe((data: Sportista)=>{
          this.pobednikSportista = data;
          this.sportistiServis.dohvatiSportistu(this.drugoMestoRepesaz.takmicar).subscribe((data: Sportista)=>{
            this.drugoMestoSportista = data;
            this.sportistiServis.dohvatiSportistu(this.treceMestoRepesaz.takmicar).subscribe((data: Sportista)=>{
              this.treceMestoSportista = data;
              this.zavrsenRepesaz = 1;
              console.log(this.pobednikSportista);
              console.log(this.drugoMestoSportista);
              console.log(this.treceMestoSportista);
              this.azurirajMedalje();
              this.porukaUnos = "";
            })
          })
        })
        //this.azuriranjeRepesaz();
      })
    }
  }

  zavrsenRepesaz: number = 0;
  repesaziFront: RepesazFront[] = [];

  azuriranjeRepesaz(){
    let zemlja1: string;
    //console.log(this.pobednik.takmicar);
    this.sportistiServis.dohvatiSportistu(this.pobednikRepesaz.takmicar).subscribe((firstPlace: Sportista)=>{
      this.pobednikSportista = firstPlace;
      console.log(this.pobednikSportista.nacionalnost);
      this.sportistiServis.dohvatiSportistu(this.drugoMestoRepesaz.takmicar).subscribe((secondPlace: Sportista)=>{
        this.drugoMestoSportista = secondPlace;
        console.log(this.drugoMestoSportista.nacionalnost);
        this.sportistiServis.dohvatiSportistu(this.treceMestoRepesaz.takmicar).subscribe((thirdPlace: Sportista)=>{
          this.treceMestoSportista = thirdPlace;
          console.log(this.treceMestoSportista.nacionalnost);
          this.azurirajMedalje();
        })
      })
    })
  }

  azuriranje(){
    let zemlja1: string;
    //console.log(this.pobednik.takmicar);
    this.sportistiServis.dohvatiSportistu(this.pobednik.takmicar).subscribe((firstPlace: Sportista)=>{
      this.pobednikSportista = firstPlace;
      console.log(this.pobednikSportista.nacionalnost);
      this.sportistiServis.dohvatiSportistu(this.drugoMesto.takmicar).subscribe((secondPlace: Sportista)=>{
        this.drugoMestoSportista = secondPlace;
        console.log(this.drugoMestoSportista.nacionalnost);
        this.sportistiServis.dohvatiSportistu(this.treceMesto.takmicar).subscribe((thirdPlace: Sportista)=>{
          this.treceMestoSportista = thirdPlace;
          console.log(this.treceMestoSportista.nacionalnost);
          this.azurirajMedalje();
        })
      })
    })
  }

  azurirajMedalje(){
    this.medaljeServis.dohvatiMedalje().subscribe((data: Medalja[])=>{
      this.sveMedalje = data;
      this.medaljeServis.dohvatiZemlju(this.pobednikSportista.nacionalnost).subscribe((zlato: Medalja)=>{
        if(zlato == null){
          this.medaljeServis.napraviMedalju(data.length + 1, this.pobednikSportista.nacionalnost, 1, 0, 0, 1).subscribe(resp=>{
            console.log(resp);
            this.medaljeServis.dohvatiZemlju(this.drugoMestoSportista.nacionalnost).subscribe((srebro: Medalja)=>{
              if(srebro == null){
                this.medaljeServis.napraviMedalju(data.length + 2, this.drugoMestoSportista.nacionalnost, 0, 1, 0, 1).subscribe(resp=>{
                  console.log(resp);
                  this.medaljeServis.dohvatiZemlju(this.treceMestoSportista.nacionalnost).subscribe((bronza: Medalja)=>{
                    if(bronza == null){
                      this.medaljeServis.napraviMedalju(data.length + 3, this.treceMestoSportista.nacionalnost, 0, 0, 1, 1).subscribe(resp=>{
                        console.log(resp);
                        this.azurirajRanking();
                      })
                    }else{
                      this.medaljeServis.azurirajBronzane(this.treceMestoSportista.nacionalnost).subscribe(respB=>{
                        console.log(respB);
                        this.azurirajRanking();
                      })
                    }
                  })
                })
              }else{
                this.medaljeServis.azurirajSrebrne(this.drugoMestoSportista.nacionalnost).subscribe(respS=>{
                  console.log(respS);
                  this.medaljeServis.dohvatiZemlju(this.treceMestoSportista.nacionalnost).subscribe((bronza: Medalja)=>{
                    if(bronza == null){
                      this.medaljeServis.napraviMedalju(data.length + 2, this.treceMestoSportista.nacionalnost, 0, 0, 1, 1).subscribe(resp=>{
                        console.log(resp);
                        this.azurirajRanking();
                      })
                    }else{
                      this.medaljeServis.azurirajBronzane(this.treceMestoSportista.nacionalnost).subscribe(respB=>{
                        console.log(respB);
                        this.azurirajRanking();
                      })
                    }
                  })
                })
              }
            })
          })
        }else{
          this.medaljeServis.azurirajZlatne(this.pobednikSportista.nacionalnost).subscribe(respZ=>{
            console.log(respZ);
            this.medaljeServis.dohvatiZemlju(this.drugoMestoSportista.nacionalnost).subscribe((srebro: Medalja)=>{
              if(srebro == null){
                this.medaljeServis.napraviMedalju(data.length + 1, this.drugoMestoSportista.nacionalnost, 0, 1, 0, 1).subscribe(resp=>{
                  console.log(resp);
                  this.medaljeServis.dohvatiZemlju(this.treceMestoSportista.nacionalnost).subscribe((bronza: Medalja)=>{
                    if(bronza == null){
                      this.medaljeServis.napraviMedalju(data.length + 2, this.treceMestoSportista.nacionalnost, 0, 0, 1, 1).subscribe(resp=>{
                        console.log(resp);
                        this.azurirajRanking();
                      })
                    }else{
                      this.medaljeServis.azurirajBronzane(this.treceMestoSportista.nacionalnost).subscribe(respB=>{
                        console.log(respB);
                        this.azurirajRanking();
                      })
                    }
                  })
                })
              }else{
                this.medaljeServis.azurirajSrebrne(this.drugoMestoSportista.nacionalnost).subscribe(respS=>{
                  console.log(respS);
                  this.medaljeServis.dohvatiZemlju(this.treceMestoSportista.nacionalnost).subscribe((bronza: Medalja)=>{
                    if(bronza == null){
                      this.medaljeServis.napraviMedalju(data.length + 1, this.treceMestoSportista.nacionalnost, 0, 0, 1, 1).subscribe(resp=>{
                        console.log(resp);
                        this.azurirajRanking();
                      })
                    }else{
                      this.medaljeServis.azurirajBronzane(this.treceMestoSportista.nacionalnost).subscribe(respB=>{
                        console.log(respB);
                        this.azurirajRanking();
                      })
                    }
                  })
                })
              }
            })
          })
        }
      })
    })
    
  }

  azurirajRanking(){
    this.medaljeServis.dohvatiMedalje().subscribe((data: Medalja[])=>{
      this.sveMedalje = data;
      this.sveMedalje.sort((a,b)=>{
        let zlatneA = a.brojZlatnih;
        let zlatneB = b.brojZlatnih;
        if(zlatneB == zlatneA){
          let srebrneA = a.brojSrebrnih;
          let srebrneB = b.brojSrebrnih;
          if(srebrneA == srebrneB){
            let bronzaA = a.brojBronzanih;
            let bronzaB = b.brojBronzanih;
            return bronzaB - bronzaA;
          }else{
            return srebrneB - srebrneA;
          }
        }else{
          return zlatneB - zlatneA;
        }
      })
      for(let i=0; i<this.sveMedalje.length; i++){
        var rank = 1;
        for(let j=0; j<this.sveMedalje.length; j++){
          if(this.sveMedalje[j].ukupno > this.sveMedalje[i].ukupno){
            rank = rank + 1;
          }
        }
        this.medaljeServis.azurirajZemljiRang(this.sveMedalje[i].zemlja, rank).subscribe(resp=>{
          console.log(resp);
          this.sportistiServis.osvojioMedalju(this.pobednikSportista.idSportiste).subscribe(respZ=>{
            console.log(respZ);
            this.sportistiServis.osvojioMedalju(this.drugoMestoSportista.idSportiste).subscribe(respS=>{
              console.log(respS);
              this.sportistiServis.osvojioMedalju(this.treceMestoSportista.idSportiste).subscribe(respB=>{
                console.log(respB);
              })
            })
          })
        })
      }
    })
  }

  sveMedalje: Medalja[];
  medalje: Medalja[];
  pobednik: RezultatFront;
  drugoMesto: RezultatFront;
  treceMesto: RezultatFront;
  pobednikRepesaz: RepesazFront;
  drugoMestoRepesaz: RepesazFront;
  treceMestoRepesaz: RepesazFront;
  pobednikSportista: Sportista;
  drugoMestoSportista: Sportista;
  treceMestoSportista: Sportista;
  zavrseno: number = 0;

  sortirajRezultate(){
    if(this.trenutniFormat.ManjeVece == 1){
      this.frontRezultati.sort((b,a)=>{
        let rezultatA = a.rezultat;
        let rezultatB = b.rezultat;
        return rezultatB - rezultatA;
      })
    }else{
      this.frontRezultati.sort((a,b)=>{
        let rezultatA = a.rezultat;
        let rezultatB = b.rezultat;
        return rezultatB - rezultatA;
      })
    }
    for(let i=0; i<this.frontRezultati.length; i++){
      this.frontRezultati[i].takmicarPersonalizovan = new Sportista();
      this.sportistiServis.dohvatiSportistu(this.frontRezultati[i].takmicar).subscribe((clan: Sportista)=>{
        this.frontRezultati[i].takmicarPersonalizovan.idSportiste = clan.idSportiste;
        this.frontRezultati[i].takmicarPersonalizovan.imeIPrezime = clan.imeIPrezime;
        this.frontRezultati[i].takmicarPersonalizovan.nacionalnost = clan.nacionalnost;
        this.frontRezultati[i].takmicarPersonalizovan.medalja = clan.medalja;
        this.frontRezultati[i].takmicarPersonalizovan.discipline = clan.discipline;
        this.frontRezultati[i].takmicarPersonalizovan.pol = clan.pol;
        this.frontRezultati[i].takmicarPersonalizovan.sport = clan.sport;
      })
    }
  }

}
