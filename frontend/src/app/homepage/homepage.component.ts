import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from 'src/models/disciplina';
import { Medalja } from 'src/models/medalja';
import { MedaljaFront } from 'src/models/medaljaFront';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { Zemlja } from 'src/models/zemlja';
import { KorisnikService } from '../korisnik.service';
import { MedaljeService } from '../medalje.service';
import { SportistiService } from '../sportisti.service';
import { SportoviIdisciplineService } from '../sportovi-idiscipline.service';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private medaljeServis: MedaljeService, private sportistiServis: SportistiService ,private ruter: Router, private zemljeServis: ZemljeService, private korisnikServis: KorisnikService, private sportoviServis: SportoviIdisciplineService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.rangPoUkupnomBroju = 1;
    this.zemljeServis.dohvatiZemlje().subscribe((podaci: Zemlja[])=>{
      this.zemlje = podaci;
    })
    this.medaljeServis.dohvatiMedalje().subscribe((medaljcice: Medalja[])=>{
      this.medaljePoZemljama = medaljcice;
      this.medaljePoZemljama.sort((a,b)=>{
        let rangA = a.ranking;
        let rangB = b.ranking;
        return rangA - rangB;
      })
    })
    this.korisnikServis.dohvatiSveSportiste().subscribe((ucesnici: Sportista[])=>{
      this.sportisti = ucesnici;
    })
    this.sportoviServis.dohvatiSportove().subscribe((sports: Sport[])=>{
      this.sportovi = sports;
    })
  }

  itemsPerPage1: number;
  itemsPerPage2: number;
  itemsPerPage3: number;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;

  poUkupnom(){
    this.rangPoUkupnomBroju = 1;
  }

  poKvalitetu(){
    this.medaljeFront = [];
    this.rangPoUkupnomBroju = 0;
    for(let i=0; i<this.medaljePoZemljama.length; i++){
      let medFront = new MedaljaFront();
      medFront.brojZlatnih = this.medaljePoZemljama[i].brojZlatnih;
      medFront.brojSrebrnih = this.medaljePoZemljama[i].brojSrebrnih;
      medFront.brojBronzanih = this.medaljePoZemljama[i].brojBronzanih;
      medFront.zemlja = this.medaljePoZemljama[i].zemlja;
      medFront.ukupno = this.medaljePoZemljama[i].ukupno;
      this.medaljeFront.push(medFront);
    }
    this.medaljeFront.sort((a,b)=>{
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
    for(let i=0; i<this.medaljeFront.length; i++){
      var rank = 1;
      for(let j=0; j<this.medaljeFront.length; j++){
        if((this.medaljeFront[j].brojZlatnih > this.medaljeFront[i].brojZlatnih) || (this.medaljeFront[j].brojZlatnih == this.medaljeFront[i].brojZlatnih && this.medaljeFront[j].brojSrebrnih > this.medaljeFront[i].brojSrebrnih) || (this.medaljeFront[j].brojZlatnih == this.medaljeFront[i].brojZlatnih && this.medaljeFront[j].brojSrebrnih == this.medaljeFront[i].brojSrebrnih && this.medaljeFront[j].brojBronzanih > this.medaljeFront[i].brojBronzanih)){
          rank = rank + 1;
        }
      }
      this.medaljeFront[i].rang = rank;
    }
  }

  nadjiDiscipline(){
    this.sportoviServis.dohvatiDisciplineZaSport(this.sport).subscribe((podaci: Disciplina[])=>{
      this.discipline = podaci;
    })
  }

  rangPoUkupnomBroju: number = 1;
  medaljePoZemljama: Medalja[] = [];
  medaljeFront: MedaljaFront[] = [];

  zemlje: Zemlja[] = [];
  sportisti: Sportista[] = [];
  sportovi: Sport[] = [];
  discipline: Disciplina[] = [];

  imeIPrezime: string;
  zemlja: string;
  sport: string;
  disciplina: string;
  pol: string;
  medalje: boolean;
  medalja: number;

  poruka: string;

  proveraPolja():boolean{
    if(this.medalje == true){
      this.medalja = 1;
    }else{
      this.medalja = 0;
    }
    if(this.imeIPrezime != null || this.zemlja != null || this.sport != null || this.disciplina != null || this.pol != null || this.medalje == true){
      return true;
    }else{
      return false;
    }
  }

  pretraga(){
    if(this.proveraPolja() == true){
      //this.poruka = "Treba raditi pretragu!";
      console.log(this.imeIPrezime);
      console.log(this.pol);
      console.log(this.zemlja);
      console.log(this.sport);
      console.log(this.disciplina);
      console.log(this.medalja);
      this.sportistiServis.traziSportiste(this.imeIPrezime, this.pol, this.zemlja, this.sport, this.disciplina, this.medalja).subscribe((podaci: Sportista[])=>{
        this.sportisti = podaci;
        //this.pol = null;
      })
    }else{
      this.korisnikServis.dohvatiSveSportiste().subscribe((data:Sportista[])=>{
        this.sportisti = data;
        //this.pol = null;
      })
    }
  }

  proveri(broj){
    console.log(broj);
    if(this.pol == 'M' && broj == 0){
      this.pol = null;
    }
    if(this.pol == 'Z' && broj == 1){
      this.pol = null;
    }
  }

}
