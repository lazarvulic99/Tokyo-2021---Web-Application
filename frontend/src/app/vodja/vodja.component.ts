import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from 'src/models/disciplina';
import { Ekipa } from 'src/models/ekipa';
import { Korisnik } from 'src/models/korisnik';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { SportStatistika } from 'src/models/sportStatistika';
import { Takmicenje } from 'src/models/takmicenje';
import { EkipaService } from '../ekipa.service';
import { KorisnikService } from '../korisnik.service';
import { SportistiService } from '../sportisti.service';
import { SportoviIdisciplineService } from '../sportovi-idiscipline.service';
import { TakmicenjaService } from '../takmicenja.service';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private sportistiServis: SportistiService, private ekipaServis: EkipaService, private ruter: Router, private zemljeServis: ZemljeService ,private takmicenjaServis: TakmicenjaService, private sportoviIdisciplineServis: SportoviIdisciplineService, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik == null){
      this.ruter.navigate(['']);
    }
    if(this.korisnik.tip != 'Vodja'){
      localStorage.removeItem('ulogovan');
      this.ruter.navigate(['']);
    }
    this.nacionalnost = this.korisnik.zemlja;
    this.sportoviIdisciplineServis.dohvatiSportove().subscribe((podaci: Sport[])=>{
      this.sportovi = podaci;
    })
    this.sportistiServis.dohvatiMojeSportiste(this.korisnik.zemlja).subscribe((atlete: Sportista[])=>{
      if(atlete == null){
        this.ukupanBroj = 0
      }else{
        this.mojiSportisti = atlete;
        this.pronadjeniSportisti = atlete;
        this.ukupanBroj = atlete.length;
        this.mojiSportovi = [];
        this.azurirajBrojTakmicaraPoSportovima();
        this.sortirajPoPrezimenuIImenu();
      }
    })
    this.takmicenjaServis.dohvatiFormiranaTakmicenja().subscribe((data: Takmicenje[])=>{
      this.formiranaTakmicenja = data;
    })
    this.sportoviIdisciplineServis.dohvatiEkipneSportove().subscribe((vraceniPodaci: Disciplina[])=>{
      this.ekipniSportovi = vraceniPodaci;
    })
  }

  mojiSportisti: Sportista[];
  mojiSportovi: SportStatistika[];
  sportistiSport: string;
  sportistiDisciplina: string;
  ukupanBroj: number;
  formiranaTakmicenja: Takmicenje[];

  korisnik: Korisnik;

  ime: string;
  prezime: string;
  pol: string;
  sport: string;
  poruka: string[];
  nacionalnost: string;
  disciplina: string;

  sportovi: Sport[];
  discipline: Disciplina[];
  disciplineSportisti: Disciplina[];

  ekipniSportovi: Disciplina[];
  ekipneDiscipline: Disciplina[];

  ekipniSport: string;
  ekipnaDisciplina: string;
  ekipniPol: string;
  prijavljeniClanovi: string;
  sportistiZaEkipu: Sportista[];
  porukaEkipa: string;
  porukaPretraga: string;

  pronadjeniSportisti: Sportista[] = [];


  nadjiDiscipline(){
    this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(this.sport).subscribe((podaci: Disciplina[])=>{
      this.discipline = podaci;
    })
  }

  vratiTrazeneDisc(){
    this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(this.sportistiSport).subscribe((podaci: Disciplina[])=>{
      this.disciplineSportisti = podaci;
    })
  }

 pretraziSportiste(){
    console.log(this.sportistiSport);
    console.log(this.sportistiDisciplina);
    this.pronadjeniSportisti = [];
    if((this.sportistiSport == null || this.sportistiDisciplina == null) || (!this.sportistiSport.localeCompare("Svi sportovi") && !this.sportistiDisciplina.localeCompare("Sve discipline"))){
      this.pronadjeniSportisti = this.mojiSportisti;
    }else{
      this.porukaPretraga = "";
      if(!this.sportistiDisciplina.localeCompare("Sve discipline")){
        console.log("Tu sam")
        for(let i=0; i<this.mojiSportisti.length; i++){
          if((this.mojiSportisti[i].sport == this.sportistiSport)){
            this.pronadjeniSportisti.push(this.mojiSportisti[i]);
          }
        }
      }else{
        for(let i=0; i<this.mojiSportisti.length; i++){
          if((this.mojiSportisti[i].sport == this.sportistiSport) && (this.mojiSportisti[i].discipline.includes(this.sportistiDisciplina))){
            this.pronadjeniSportisti.push(this.mojiSportisti[i]);
          }
        }
      }
    }
    this.sortirajPoPrezimenuIImenu();
    this.sportistiSport = "Svi sportovi";
    this.sportistiDisciplina = "Sve discipline";
  }

  sortirajPoPrezimenuIImenu(){
    this.pronadjeniSportisti.sort((a,b)=>{
      let imeA = a.imeIPrezime.split(" ")[0];
      let prezimeA = a.imeIPrezime.split(" ")[1];
      let imeB = b.imeIPrezime.split(" ")[0];
      let prezimeB = b.imeIPrezime.split(" ")[1];
      if(prezimeA.localeCompare(prezimeB) == 0){
        return imeA.localeCompare(imeB);
      }else{
        return prezimeA.localeCompare(prezimeB);
      }
    })
  }

  nadjiEkipneDiscipline(){
    this.ekipneDiscipline = [];
    if(this.ekipniSport == null){
      this.porukaEkipa = "Morate prvo odabrati sport";
    }else{
      let traziSport = this.ekipniSport.charAt(0).toUpperCase() + this.ekipniSport.slice(1);
      this.sportoviIdisciplineServis.dohvatiEkipneDisciplineZaSport(traziSport).subscribe((data: Disciplina[])=>{
        if(data == null || data.length == 0){
          this.porukaEkipa = 'Trazeni sport ne postoji!';
        }else{
          this.ekipneDiscipline = data;
        }
      })
    }
  }

  proveraPoljaZaEkipu(): boolean{
    if(this.ekipniSport == null){
      this.porukaEkipa = "Sva polja su obavezna";
      return false;
    }else{
      let traziSport = this.ekipniSport.charAt(0).toUpperCase() + this.ekipniSport.slice(1);
      let pronasao = false;
      for(let i=0; i<this.sportovi.length; i++){
        if(this.sportovi[i].sport == traziSport){
          pronasao = true;
          break;
        }
      }
      if(pronasao == false){
        this.porukaEkipa = "Uneti sport ne postoji!";
        return false;
      }else{
        this.porukaEkipa = "Uneti sport postoji!";
        return true;
      }
    }
  }

  dohvatiTakmicare(){
    this.sportistiZaEkipu = [];
    if(this.proveraPoljaZaEkipu() == true){
      let traziSport = this.ekipniSport.charAt(0).toUpperCase() + this.ekipniSport.slice(1);
      this.sportistiServis.dohvatiPrijavljeneSportisteZaVodju(this.korisnik.zemlja, this.ekipniPol, traziSport, this.ekipnaDisciplina).subscribe((data: Sportista[])=>{
          if(data == null || data.length == 0){
            this.porukaEkipa = "Za trazeni sport i disciplinu nema prijavljenih sportista!";
          }else{
            this.sportistiZaEkipu = data;
          }
      })
    }
  }


  prijaviEkipu(){
    let minBroj: number;
    let maxBroj: number;
    if(this.ekipniSport == null || this.ekipnaDisciplina == null || this.ekipniPol == null){
      this.porukaEkipa = "Morate odabrati sva polja!";
    }else{
      let traziSport = this.ekipniSport.charAt(0).toUpperCase() + this.ekipniSport.slice(1);
      this.sportoviIdisciplineServis.dohvatiTrazenuDisciplinu(traziSport, this.ekipnaDisciplina).subscribe((data: Disciplina)=>{
        minBroj = data.minIgraca;
        maxBroj = data.maxIgraca;
        this.porukaEkipa = "Minimalan broj igraca je: " + minBroj + " , a maksimalan broj igraca je: " + maxBroj;
        console.log(this.prijavljeniClanovi);
        if(this.prijavljeniClanovi != null){
          if(this.prijavljeniClanovi.length < minBroj || this.prijavljeniClanovi.length > maxBroj){
            this.porukaEkipa = "Netacan broj clanova ekipe. Minimalan broj igraca je: " + minBroj + " , a maksimalan broj igraca je: " + maxBroj;
            window.setTimeout(location.reload.bind(location), 2000);
          }else{
            this.ekipaServis.pronadjiPostojecuEkipu(this.korisnik.zemlja, traziSport, this.ekipnaDisciplina, this.ekipniPol).subscribe((vracenaEkipa: Ekipa)=>{
              if(vracenaEkipa == null){
                this.porukaEkipa = "Nova ekipa!";
                this.ekipaServis.dodajEkipu(this.korisnik.zemlja, traziSport, this.ekipnaDisciplina, this.ekipniPol, this.prijavljeniClanovi).subscribe(resp=>{
                  console.log(resp);
                  this.porukaEkipa = "Ekipa uspesno dodata!";
                  this.ekipniSport = null;
                  this.ekipnaDisciplina = null;
                  this.ekipniPol = null;
                  this.prijavljeniClanovi = null;
                  this.sportistiZaEkipu = null;
                  window.setTimeout(location.reload.bind(location), 2000);
                })
              }else{
                this.porukaEkipa = "Ekipa vec postoji oformljena!";
                this.ekipniSport = null;
                this.ekipnaDisciplina = null;
                this.ekipniPol = null;
                this.prijavljeniClanovi = null;
                this.sportistiZaEkipu = null;
                window.setTimeout(location.reload.bind(location), 2000);
              }
            })
          }
        }else{
          this.porukaEkipa = "Minimalan broj igraca je: " + minBroj + " , a maksimalan broj igraca je: " + maxBroj;
          window.setTimeout(location.reload.bind(location), 2000);
        }
      })
    }
  }

  proveraPolja():boolean{
    if(this.ime == null || this.prezime == null || this.pol == null || this.sport == null || this.disciplina == null){
      return false;
    }else{
      return true;
    }
  }

  odbaceneDiscipline: string[];
  prihvaceneDiscipline: string[];
  porukaDodavanje: string;

  dodaj(){
    this.poruka = [];
    if(this.proveraPolja() == false){
      this.poruka[0] = "Sva polja su obavezna!";
    }else{
      this.odbaceneDiscipline = [];
      this.prihvaceneDiscipline = [];
      for(let i=0; i<this.disciplina.length; i++){
        let odbacena = false;
        for(let j=0; j<this.formiranaTakmicenja.length; j++){
          if(this.disciplina[i] == this.formiranaTakmicenja[j].disciplina){
            odbacena = true;
            break;
          }
        }
        if(odbacena == false){
          this.prihvaceneDiscipline.push(this.disciplina[i]);
        }else{
          this.odbaceneDiscipline.push(this.disciplina[i]);
        }
      }
      console.log(this.prihvaceneDiscipline);
      console.log(this.odbaceneDiscipline);
      if(this.odbaceneDiscipline.length > 0){
        for(let i=0; i<this.odbaceneDiscipline.length; i++){
          this.poruka[i] = "";
          this.poruka[i] += "Neuspela prijava za sport: " + this.sport + " i disciplinu: " + this.odbaceneDiscipline[i] + " jer je takmicenje vec formirano!";
        }
      }
      let dodajDiscipline: string[];
      dodajDiscipline = [];
      for(let m=0; m<this.prihvaceneDiscipline.length; m++){
        dodajDiscipline.push(this.prihvaceneDiscipline[m]);
      }
      let imeIPrezime = this.ime + " " + this.prezime;
      if(dodajDiscipline != null && dodajDiscipline.length > 0){
        this.korisnikServis.pronadjiSportistu(imeIPrezime).subscribe((data: Sportista)=>{
          if(data == null){
            this.porukaDodavanje = "Novi sportista";
            this.korisnikServis.dohvatiSveSportiste().subscribe((data: Sportista[])=>{
              if(data == null){
                let broj = 1;
                this.korisnikServis.dodajSportistu(broj, imeIPrezime, this.pol, this.nacionalnost, this.sport, dodajDiscipline, 0).subscribe(resp=>{
                  console.log(resp);
                  this.zemljeServis.povecajBrojSportista(this.nacionalnost).subscribe(resp=>{
                    console.log(resp);
                    this.porukaDodavanje = "Sportista uspesno dodat!";
                    this.azurirajPocetanBroj();
                  })
                })
              }else{
                let broj = data.length;
                broj = broj + 1;
                this.korisnikServis.dodajSportistu(broj, imeIPrezime, this.pol, this.nacionalnost, this.sport, dodajDiscipline, 0).subscribe(resp=>{
                  console.log(resp);
                  this.zemljeServis.povecajBrojSportista(this.nacionalnost).subscribe(resp=>{
                    console.log(resp);
                    this.porukaDodavanje = "Sportista uspesno dodat!";
                    this.azurirajPocetanBroj();
                  })
                })
              }
            })
          }else{
            if(this.sport.localeCompare(data.sport) != 0){
              this.porukaDodavanje = "Sportisti je vec dodeljen drugi sport!";
            }else{
              for(let i = 0; i<this.prihvaceneDiscipline.length; i++){
                let postojiVecDisc = false;
                for(let j=0; j<data.discipline.length; j++){
                  if(this.prihvaceneDiscipline[i] == data.discipline[j]){
                    postojiVecDisc = true;
                    break;
                  }
                }
                if(postojiVecDisc == false){
                  this.korisnikServis.azurirajSportistiDiscipline(imeIPrezime ,this.prihvaceneDiscipline[i]).subscribe(resp=>{
                    console.log(resp);
                    this.azurirajPocetanBroj();
                  })
                }
              }
              this.porukaDodavanje = "Azuriranje uspesno!";
            }
          }
        })
      }else{
        this.porukaDodavanje = "Sportista se mora prijaviti za bar 1 neformiranu disciplinu!";
      }
    }
  }

  azurirajPocetanBroj(){
    this.sportistiServis.dohvatiMojeSportiste(this.korisnik.zemlja).subscribe((atlete: Sportista[])=>{
      if(atlete == null){
        this.ukupanBroj = 0
      }else{
        this.mojiSportisti = atlete;
        this.ukupanBroj = atlete.length;
      }
      this.azurirajBrojTakmicaraPoSportovima();
    })
  }

  azurirajBrojTakmicaraPoSportovima(){
    for(let i = 0; i<this.mojiSportisti.length; i++){
      let vecPostoji = false;
      for(let j=0; j<this.mojiSportovi.length; j++){
        if(this.mojiSportovi[j].sport == this.mojiSportisti[i].sport){
          vecPostoji = true;
          break;
        }
      }
      if(vecPostoji == false){
        let noviPodatak: SportStatistika;
        noviPodatak = new SportStatistika();
        noviPodatak.sport = this.mojiSportisti[i].sport;
        noviPodatak.brojTakmicara = 0;
        this.mojiSportovi.push(noviPodatak);
      }
    }
    for(let i=0; i<this.mojiSportovi.length; i++){
      this.sportistiServis.dohvatiBrojTakmicaraZaSport(this.korisnik.zemlja, this.mojiSportovi[i].sport).subscribe((data: Sportista[])=>{
        this.mojiSportovi[i].brojTakmicara = data.length;
      })
    }
  }

}
