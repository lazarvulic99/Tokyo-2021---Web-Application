import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegiranje } from 'src/models/delegiranje';
import { Disciplina } from 'src/models/disciplina';
import { Format } from 'src/models/format';
import { Korisnik } from 'src/models/korisnik';
import { Lokacija } from 'src/models/lokacija';
import { Nosioc } from 'src/models/nosioc';
import { Rekord } from 'src/models/rekord';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { Takmicenje } from 'src/models/takmicenje';
import { KorisnikService } from '../korisnik.service';
import { LokacijeService } from '../lokacije.service';
import { RekordiService } from '../rekordi.service';
import { SportistiService } from '../sportisti.service';
import { SportoviIdisciplineService } from '../sportovi-idiscipline.service';
import { TakmicenjaService } from '../takmicenja.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private takmicenjaServis:TakmicenjaService, private sportistiServis: SportistiService,private lokacijeServis: LokacijeService,private ruter: Router, private sportoviIdisciplineServis: SportoviIdisciplineService, private rekordiServis: RekordiService, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik == null){
      this.ruter.navigate(['']);
    }
    if(this.korisnik.tip != 'Organizator'){
      localStorage.removeItem('ulogovan');
      this.ruter.navigate(['']);
    }
    this.dodatiNosioci = 0;
    this.zatraziNosioce = 0;
    this.korisnikServis.dohvatiSveNeodobreneKorisnike().subscribe((neodobreni: Korisnik[])=>{
      this.neodobreniKorisnici = neodobreni;
      if(neodobreni == null){
        this.ispisTabele = 0;
      }else{
        if(neodobreni.length == 0){
          this.ispisTabele = 0;
        }else{
          this.ispisTabele = 1;
        }
      }
    })
    this.rekordiServis.dohvatiSveRekorde("M").subscribe((data: Rekord[])=>{
      this.muskiRekordi = data;
    })
    this.rekordiServis.dohvatiSveRekorde("Z").subscribe((data: Rekord[])=>{
      this.zenskiRekordi = data;
    })
    this.rekordiServis.dohvatiSveRekorde("O").subscribe((data: Rekord[])=>{
      this.mesovitiRekordi = data;
    })
    this.sportoviIdisciplineServis.dohvatiSportove().subscribe((vraceniSportovi: Sport[])=>{
      this.sportovi = vraceniSportovi;
    })
    this.lokacijeServis.dohvatiLokacije().subscribe((vraceneLokacije: Lokacija[])=>{
      this.lokacije = vraceneLokacije;
    })
    this.dohvatiDelegate();
  }

  zatraziNosioce: number = 0;
  neodobreniKorisnici: Korisnik[];
  korisnik: Korisnik;

  odobri(kor_ime, ime, prezime, tip){
    this.korisnikServis.odobriKorisnika(kor_ime).subscribe(resp=>{
      if(resp['poruka']=='ok'){
        if(tip.localeCompare("Delegat") == 0){
          this.korisnikServis.napraviRekordZaDelegiranje(kor_ime, ime, prezime, 0, []).subscribe(res=>{
            console.log(res);
            this.korisnikServis.dohvatiSveNeodobreneKorisnike().subscribe((data: Korisnik[])=>{
              this.neodobreniKorisnici = data;
              if(data == null){
                this.ispisTabele = 0
              }else{
                if(data.length == 0){
                  this.ispisTabele = 0;
                }else{
                  this.ispisTabele = 1;
                }
              }
              this.korisnikServis.dohvatiDelegate().subscribe((podaci: Delegiranje[])=>{
                this.delegati = podaci;
              })
            })
          })
        }else{
          this.korisnikServis.dohvatiSveNeodobreneKorisnike().subscribe((data: Korisnik[])=>{
            this.neodobreniKorisnici = data;
            if(data == null){
              this.ispisTabele = 0
            }else{
              if(data.length == 0){
                this.ispisTabele = 0;
              }else{
                this.ispisTabele = 1;
              }
            }
            this.korisnikServis.dohvatiDelegate().subscribe((podaci: Delegiranje[])=>{
              this.delegati = podaci;
            })
          })
        }
      }
    })
  }

  muskiRekordi: Rekord[];
  zenskiRekordi: Rekord[];
  lokacije: Lokacija[];
  mesovitiRekordi: Rekord[];
  ispisTabele: number;

  sport: string;
  disciplina: string;
  vrsta: string;
  minIgraca: number;
  maxIgraca: number;
  minTakm: number;
  maxTakm: number;
  ManjeVece: number;
  brRundi: number;
  unosFormat: string;

  sportovi: Sport[];
  discipline: Disciplina[];
  sportZaTakmicenje: string;
  disciplinaZaTakmicenje: string;
  polZaTakmicenje: string;
  delegatZaTakmicenje: string;
  datumPocetka: Date;
  datumKraja: Date;
  lokacijeZaTakmicenje: string;
  vrstaZaTakmicenje: string;
  format: string;

  poruka: string;
  porukaZaTakmicenje: string;
  nova: string;
  odabraniSportisti: string;

  nadjiDiscipline(){
    this.zatraziNosioce = 0;
    this.dodatiNosioci = 0;
    this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(this.sportZaTakmicenje).subscribe((podaci: Disciplina[])=>{
      this.discipline = podaci;
    })
  }

  proveraPolja():boolean{
    if(this.sport == null || this.disciplina == null || this.vrsta == null || this.minIgraca == null || this.maxIgraca == null || this.minTakm == null || this.maxTakm == null || this.unosFormat == null){
      return false;
    }else{
      return true;
    }
  }

  /* proveraPoljaZaTakmicenje():boolean{
    if(this.sportZaTakmicenje == null || this.disciplinaZaTakmicenje == null || this.polZaTakmicenje == null || this.datumPocetka == null || this.datumKraja == null || this.lokacijeZaTakmicenje == null || this.vrstaZaTakmicenje == null || this.format == null){
      return false;
    }else{
      return true;
    }
  } */

  proveraPoljaZaTakmicenje():boolean{
    if(this.sportZaTakmicenje == null || this.disciplinaZaTakmicenje == null || this.polZaTakmicenje == null || this.lokacijeZaTakmicenje == null || this.vrstaZaTakmicenje == null || this.format == null || this.datumPocetka == null || this.datumKraja == null){
      return false;
    }else{
      return true;
    }
  }

  delegati: Delegiranje[];
  sportisti: Sportista[];

  dohvatiDelegate(){
    this.korisnikServis.dohvatiDelegate().subscribe((data: Delegiranje[])=>{
      this.delegati = data;
    })
  }

  /* dohvatiTakmicare(){
    if(this.proveraPoljaZaTakmicenje() == false){
      this.porukaZaTakmicenje = "Morate uneti sva polja!";
    }else{
      if(this.datumPocetka > this.datumKraja){
        this.porukaZaTakmicenje = "Datum kraja ne moze biti pre datuma pocetka!";
      }else{
        this.sportistiServis.dohvatiPrijavljeneSportiste(this.polZaTakmicenje, this.sportZaTakmicenje, this.disciplinaZaTakmicenje).subscribe((data: Sportista[])=>{
          this.sportisti = data;
        })
      }
    }
  } */

  dohvatiTakmicare(){
    if(this.proveraPoljaZaTakmicenje() == false){
      this.porukaZaTakmicenje = "Morate uneti sva polja!";
    }else{
      this.sportistiServis.dohvatiPrijavljeneSportiste(this.polZaTakmicenje, this.sportZaTakmicenje, this.disciplinaZaTakmicenje).subscribe((data: Sportista[])=>{
        this.sportisti = data;
      })
    }
  }


  /* dodajTakmicenje(){
    if(this.proveraPoljaZaTakmicenje() == false){
      this.porukaZaTakmicenje = "Morate uneti sva polja!";
    }else{
      if(this.datumPocetka > this.datumKraja){
        this.porukaZaTakmicenje = "Datum kraja ne moze biti pre datuma pocetka!";
      }else{
        this.sportoviIdisciplineServis.proveriTipZaDisciplinu(this.sportZaTakmicenje, this.disciplinaZaTakmicenje).subscribe((vracenaDisc: Disciplina)=>{
          if(vracenaDisc.vrsta == this.vrstaZaTakmicenje){
            let sportistiNiz: Array<Number>
            sportistiNiz = [];
            if(this.odabraniSportisti != null){
              for(let i=0; i<this.odabraniSportisti.length; i++){
                let broj = this.odabraniSportisti[i].split('-')[0];
                sportistiNiz.push(parseInt(broj));
              }
            }
            //console.log(sportistiNiz);
            if(this.vrstaZaTakmicenje == 'i'){
              this.porukaZaTakmicenje = "Individualno takmicenje";
              this.takmicenjaServis.dohvatiTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe((data: Takmicenje)=>{
                if(data != null){
                  //this.porukaZaTakmicenje = "Takmicenje postoji!";
                  if(data.formirano == 0){
                    this.takmicenjaServis.azurirajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format).subscribe(resp=>{
                      console.log(resp);
                      this.takmicenjaServis.dodajDelegate(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.delegatZaTakmicenje).subscribe(resp=>{
                        console.log(resp)
                        this.takmicenjaServis.dodajSportiste(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, sportistiNiz).subscribe(res=>{
                          console.log(res);
                          for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                            let ime: string;
                            let prezime: string;
                            ime = this.delegatZaTakmicenje[i].split(" ")[0];
                            prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                            this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                              console.log(odg);
                              this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                                console.log(odg);
                                this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                                this.dohvatiDelegate();
                              })
                            })
                          }
                        })
                      })
                    })
                  }else{
                    this.porukaZaTakmicenje = "Takmicenje je vec formirano!";
                  }
                }else{
                  this.porukaZaTakmicenje = "Novo takmicenje";
                  this.takmicenjaServis.dodajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format, this.delegatZaTakmicenje, sportistiNiz).subscribe(resp=>{
                    console.log(resp);
                    this.takmicenjaServis.formirajTakm(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe(response=>{
                      console.log(response);
                      for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                        let ime: string;
                        let prezime: string;
                        ime = this.delegatZaTakmicenje[i].split(" ")[0];
                        prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                        this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                          console.log(odg);
                          this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                            console.log(odg);
                            this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                            this.dohvatiDelegate();
                          })
                        })
                      }
                    })
                  })
                }
              })
            }else{
              this.porukaZaTakmicenje = "Ekipno takmicenje";
            }
          }else{
            this.porukaZaTakmicenje = "Pogresno odabran tip takmicenja za odabranu disciplinu!";
          }
        })
      }
    }
  } */

  sportistiNiz: Array<Number> = [];
  prosledjeniSportisti: Nosioc[] = [];
  brNosioc: Array<number> = [];

  greskaBrojaTakmicara: number = 0;
  dodatiNosioci: number = 0;

  unesiNosioca(i){
    //console.log(this.prosledjeniSportisti[i]);
    //console.log(this.brNosioc[i]);
    if(this.brNosioc[i] == null){
      this.porukaZaTakmicenje = "Morate uneti broj nosioca!";
      return;
    }else{
      this.prosledjeniSportisti[i].nosioc = this.brNosioc[i];
      console.log(this.prosledjeniSportisti[i]);
      this.dodatiNosioci = this.dodatiNosioci + 1;
      console.log(this.dodatiNosioci);
    }
  }

  dodajNosioce(){
    if(this.novoStaro == 1){
      console.log("Staro takmicenje!");
      if(this.dodatiNosioci < this.sportistiNiz.length){
        this.porukaZaTakmicenje = "Morate svima uneti nosioce!";
      }else{
        this.porukaZaTakmicenje = "Svi nosioci su uneti!";
        this.prosledjeniSportisti.sort((b,a)=>{
          let rezultatA = a.nosioc;
          let rezultatB = b.nosioc;
          return rezultatB - rezultatA;
        })
        console.log(this.prosledjeniSportisti);
        this.sportistiNiz = [];
        for(let i=0; i<this.prosledjeniSportisti.length; i++){
          this.sportistiNiz.push(this.prosledjeniSportisti[i].sportista.idSportiste);
        }
        console.log(this.sportistiNiz);
        this.takmicenjaServis.azurirajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format).subscribe(resp=>{
          console.log(resp);
          this.takmicenjaServis.dodajDelegate(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.delegatZaTakmicenje).subscribe(resp=>{
            console.log(resp)
            this.takmicenjaServis.dodajSportiste(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.sportistiNiz).subscribe(res=>{
              console.log(res);
              for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                let ime: string;
                let prezime: string;
                ime = this.delegatZaTakmicenje[i].split(" ")[0];
                prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                  console.log(odg);
                  this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                    console.log(odg);
                    this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                    this.dohvatiDelegate();
                  })
                })
              }
            })
          })
        })
      }
    }else{
      console.log("Novo takmicenje!");
      if(this.dodatiNosioci < this.sportistiNiz.length){
        this.porukaZaTakmicenje = "Morate svima uneti nosioce!";
      }else{
        this.porukaZaTakmicenje = "Svi nosioci su uneti!";
        this.prosledjeniSportisti.sort((b,a)=>{
          let rezultatA = a.nosioc;
          let rezultatB = b.nosioc;
          return rezultatB - rezultatA;
        })
        console.log(this.prosledjeniSportisti);
        this.sportistiNiz = [];
        for(let i=0; i<this.prosledjeniSportisti.length; i++){
          this.sportistiNiz.push(this.prosledjeniSportisti[i].sportista.idSportiste);
        }
        console.log(this.sportistiNiz);
        this.takmicenjaServis.dodajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format, this.delegatZaTakmicenje, this.sportistiNiz, 0).subscribe(resp=>{
          console.log(resp);
          this.takmicenjaServis.formirajTakm(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe(response=>{
            console.log(response);
            this.takmicenjaServis.dodajDelegate(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.delegatZaTakmicenje).subscribe(resp=>{
              console.log(resp);
              for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                let ime: string;
                let prezime: string;
                ime = this.delegatZaTakmicenje[i].split(" ")[0];
                prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                  console.log(odg);
                  this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                    console.log(odg);
                    this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                    this.dohvatiDelegate();
                  })
                })
              }
            })
          })
        })
      }
    }
  }

  novoStaro: number = 0;

  proveraBrojaTakmicaraIDodajAkoMoze(){
    this.sportoviIdisciplineServis.dohvatiFormatSporta(this.sportZaTakmicenje, this.disciplinaZaTakmicenje).subscribe((format: Format)=>{
      if(format != null){
        console.log(format);
        if(this.sportZaTakmicenje == "Tenis"){
          this.prosledjeniSportisti = [];
          if(this.sportistiNiz.length < format.min){
            this.greskaBrojaTakmicara = 1;
            this.porukaZaTakmicenje = "Za odabrani sport i disciplinu broj takmicara sme da bude 4, 8 ili 16!";
          }
          if(this.sportistiNiz.length > format.max){
            this.greskaBrojaTakmicara = 1;
            this.porukaZaTakmicenje = "Za odabrani sport i disciplinu broj takmicara sme da bude 4, 8 ili 16!";
          }
          if(this.sportistiNiz.length >= format.min && this.sportistiNiz.length <= format.max){
            if(this.sportistiNiz.length != 4 && this.sportistiNiz.length != 8 && this.sportistiNiz.length != 16){
              this.greskaBrojaTakmicara = 1;
              this.porukaZaTakmicenje = "Za odabrani sport i disciplinu broj takmicara sme da bude 4, 8 ili 16!";
            }else{
              this.porukaZaTakmicenje = "Unesite nosioce!";
              this.takmicenjaServis.dohvatiTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe((data: Takmicenje)=>{
                if(data != null){
                  //this.porukaZaTakmicenje = "Takmicenje postoji!";
                  this.novoStaro = 1;
                  if(data.formirano == 0){
                    console.log("Unesi nosioce!");
                    for(let i=0; i<this.sportistiNiz.length; i++){
                      this.sportistiServis.dohvatiSportistu(this.sportistiNiz[i]).subscribe((data: Sportista)=>{
                        let nos = new Nosioc();
                        nos.sportista = data;
                        nos.nosioc = 0;
                        this.prosledjeniSportisti.push(nos);
                      })
                    }
                    console.log(this.prosledjeniSportisti);
                    this.zatraziNosioce = 1;
                  }else{
                    this.porukaZaTakmicenje = "Takmicenje je vec formirano!";
                  }
                }else{
                  this.novoStaro = 0;
                  this.porukaZaTakmicenje = "Novo takmicenje";
                  console.log("Unesi nosioce!");
                  for(let i=0; i<this.sportistiNiz.length; i++){
                    this.sportistiServis.dohvatiSportistu(this.sportistiNiz[i]).subscribe((data: Sportista)=>{
                      let nos = new Nosioc();
                      nos.sportista = data;
                      nos.nosioc = 0;
                      this.prosledjeniSportisti.push(nos);
                    })
                  }
                  console.log(this.prosledjeniSportisti);
                  this.zatraziNosioce = 1;
                }
              })
            }
          }
        }else{
          console.log(format.min);
          console.log(format.max);
          if(format.min == format.max){
            this.porukaZaTakmicenje = "ovde sam"
            if(this.sportistiNiz.length != format.min){
              this.greskaBrojaTakmicara = 1;
              console.log(this.greskaBrojaTakmicara);
              this.porukaZaTakmicenje = "Za odabrani sport i disciplinu, broj takmicara treba da bude tacno: " + format.min;
            }else{
              console.log("Ovde nisam usao");
              this.greskaBrojaTakmicara = 0;
            }
          }else{
            console.log("Ni ovde nisam usao!");
            if(this.sportistiNiz.length < format.min || this.sportistiNiz.length > format.max){
              this.greskaBrojaTakmicara = 1;
              this.porukaZaTakmicenje = "Za odabrani sport i disciplinu broj takmicara treba najmanje biti: " + format.min + " a najvise: " + format.max;
            }else{
              this.greskaBrojaTakmicara = 0;
            }
          }
          console.log(this.greskaBrojaTakmicara);
          if(this.greskaBrojaTakmicara == 1){
            console.log("U onoj grani sam!");
          }else{
            this.takmicenjaServis.dohvatiTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe((data: Takmicenje)=>{
              if(data != null){
                //this.porukaZaTakmicenje = "Takmicenje postoji!";
                if(data.formirano == 0){
                  this.takmicenjaServis.azurirajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format).subscribe(resp=>{
                    console.log(resp);
                    this.takmicenjaServis.dodajDelegate(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.delegatZaTakmicenje).subscribe(resp=>{
                      console.log(resp)
                      this.takmicenjaServis.dodajSportiste(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.sportistiNiz).subscribe(res=>{
                        console.log(res);
                        for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                          let ime: string;
                          let prezime: string;
                          ime = this.delegatZaTakmicenje[i].split(" ")[0];
                          prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                          this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                            console.log(odg);
                            this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                              console.log(odg);
                              this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                              this.dohvatiDelegate();
                            })
                          })
                        }
                      })
                    })
                  })
                }else{
                  this.porukaZaTakmicenje = "Takmicenje je vec formirano!";
                }
              }else{
                this.porukaZaTakmicenje = "Novo takmicenje";
                this.takmicenjaServis.dodajTakmicenje(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje, this.datumPocetka, this.datumKraja, this.lokacijeZaTakmicenje, this.format, this.delegatZaTakmicenje, this.sportistiNiz, 0).subscribe(resp=>{
                  console.log(resp);
                  this.takmicenjaServis.formirajTakm(this.sportZaTakmicenje, this.disciplinaZaTakmicenje, this.polZaTakmicenje, this.vrstaZaTakmicenje).subscribe(response=>{
                    console.log(response);
                    for(let i=0; i<this.delegatZaTakmicenje.length; i++){
                      let ime: string;
                      let prezime: string;
                      ime = this.delegatZaTakmicenje[i].split(" ")[0];
                      prezime = this.delegatZaTakmicenje[i].split(" ")[1];
                      this.korisnikServis.povecajBrojDeligaranja(ime, prezime).subscribe(odg=>{
                        console.log(odg);
                        this.korisnikServis.postaviDisccipline(ime, prezime, this.disciplinaZaTakmicenje).subscribe(od=>{
                          console.log(odg);
                          this.porukaZaTakmicenje = "Takmicenje uspesno formirano!";
                          this.dohvatiDelegate();
                        })
                      })
                    }
                  })
                })
              }
            })
          }
          console.log(this.greskaBrojaTakmicara);
        }
      }
    })
  }

  dodajTakmicenje(){
    if(this.proveraPoljaZaTakmicenje() == false){
      this.porukaZaTakmicenje = "Morate uneti sva polja!";
    }else{
      if(this.datumPocetka > this.datumKraja){
        this.porukaZaTakmicenje = "Datum kraja ne moze biti pre datuma pocetka!";
      }else{
        this.sportoviIdisciplineServis.proveriTipZaDisciplinu(this.sportZaTakmicenje, this.disciplinaZaTakmicenje).subscribe((vracenaDisc: Disciplina)=>{
          if(vracenaDisc.vrsta == this.vrstaZaTakmicenje){
            if(this.odabraniSportisti != null){
              for(let i=0; i<this.odabraniSportisti.length; i++){
                let broj = this.odabraniSportisti[i].split('-')[0];
                this.sportistiNiz.push(parseInt(broj));
              }
            }
            if(this.vrstaZaTakmicenje == 'i'){
              this.proveraBrojaTakmicaraIDodajAkoMoze();
            }else{
              this.porukaZaTakmicenje = "Ekipno takmicenje";
            }
          }else{
            this.porukaZaTakmicenje = "Pogresno odabran tip takmicenja za odabranu disciplinu!";
          }
        })
      }
    }
  }

  disciplinaUlepsana: string;

  dodaj(){
    if(this.proveraPolja() == false){
      this.poruka = "Sva polja su obavezna!";
    }else{
      if(this.minIgraca > this.maxIgraca){
        this.poruka = "Minimalan broj igraca mora biti manji od maksimalnog broja igraca!";
        if(this.maxTakm < this.minTakm){
          this.poruka = "Minimalan broj igraca za takmicenje mora biti manji od maksimalnog brojaca igraca za takmicenje!";
        }
      }else{
        //this.poruka = "Sve uneto"
        /* console.log(this.sport);
        console.log(this.disciplina);
        console.log(this.vrsta);
        console.log(this.minIgraca);
        console.log(this.maxIgraca);
        console.log(this.minTakm);
        console.log(this.maxTakm);
        console.log(this.ManjeVece);
        console.log(this.brRundi);
        console.log(this.unosFormat); */
        this.sportoviIdisciplineServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
          var pronasao = false;
          for(let i=0; i<sportovi.length; i++){
            if(this.sportoviIdisciplineServis.strcasecmp(this.sport, sportovi[i].sport) == 0){
              pronasao = true;
              break;
            }
          }
          if(pronasao == true){
            let traziSport = this.sport.charAt(0).toUpperCase() + this.sport.slice(1);
            this.sportoviIdisciplineServis.dohvatiDisciplineZaSport(traziSport).subscribe((discipline: Disciplina[])=>{
              if(discipline.length > 0){
                let pronasao = false;
                for(let i=0; i<discipline.length; i++){
                  if(this.sportoviIdisciplineServis.strcasecmp(this.disciplina, discipline[i].disciplina) == 0){
                    pronasao = true;
                    break;
                  }
                }
                if(pronasao == true){
                  this.poruka = "Vec postoje i taj sport i ta disciplina!";
                }else{
                  this.poruka = "Ovo je nova disciplina!";
                  this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disc: Disciplina[])=>{
                    let broj = disc.length;
                    broj = broj + 1;
                    console.log(this.sport);
                    console.log(this.disciplina)
                    if(this.disciplina.localeCompare('/') == 0){
                      this.disciplinaUlepsana = this.sport;
                    }else{
                      this.disciplinaUlepsana = this.disciplina;
                    }
                    this.sportoviIdisciplineServis.dodajDisciplinu(broj, traziSport, this.disciplinaUlepsana, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp=>{
                      console.log(resp);
                      this.sportoviIdisciplineServis.azurirajSport(traziSport,broj).subscribe(resp=>{
                        console.log(resp);
                        this.sportoviIdisciplineServis.dodajFormat(traziSport, this.disciplinaUlepsana, this.ManjeVece, this.brRundi, this.unosFormat ,this.minTakm, this.maxTakm).subscribe(resp=>{
                          console.log(resp);
                          this.poruka = "Uspesno dodata nova disciplina!";
                          this.sportoviIdisciplineServis.dohvatiSportove().subscribe((vraceniSportovi: Sport[])=>{
                            this.sportovi = vraceniSportovi;
                          })
                        })
                      })
                    })
                  })
                }
              }else{
                this.poruka = "Prva disciplina za trazeni sport!";
                this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disc: Disciplina[])=>{
                  let broj = disc.length;
                  broj = broj + 1;
                  if(this.disciplina.localeCompare('/') == 0){
                    this.disciplinaUlepsana = this.sport;
                  }else{
                    this.disciplinaUlepsana = this.disciplina;
                  }
                  this.sportoviIdisciplineServis.dodajDisciplinu(broj, traziSport, this.disciplinaUlepsana, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp=>{
                    console.log(resp);
                    this.sportoviIdisciplineServis.azurirajSport(traziSport,1).subscribe(resp=>{
                      console.log(resp);
                      this.sportoviIdisciplineServis.dodajFormat(traziSport, this.disciplinaUlepsana, this.ManjeVece, this.unosFormat, this.brRundi, this.minTakm, this.maxTakm).subscribe(resp=>{
                        console.log(resp);
                        this.poruka = "Uspesno dodata nova disciplina!";
                        this.sportoviIdisciplineServis.dohvatiSportove().subscribe((vraceniSportovi: Sport[])=>{
                          this.sportovi = vraceniSportovi;
                        })
                      })
                    })
                  })
                })
              }
            })
          }else{
            let broj = sportovi.length;
            broj = broj + 1;
            let traziSport = this.sport.charAt(0).toUpperCase() + this.sport.slice(1);
            let discp = [];
            this.sportoviIdisciplineServis.dodajSport(broj, traziSport, discp).subscribe(resp=>{
              console.log(resp);
              this.poruka = "Uspesno dodat sport!";
              this.sportoviIdisciplineServis.dohvatiDiscipline().subscribe((disp: Disciplina[])=>{
                let ukupnoDisciplina = disp.length;
                ukupnoDisciplina = ukupnoDisciplina + 1;
                if(this.disciplina.localeCompare('/') == 0){
                  this.disciplinaUlepsana = this.sport;
                }else{
                  this.disciplinaUlepsana = this.disciplina;
                }
                this.sportoviIdisciplineServis.dodajDisciplinu(ukupnoDisciplina, traziSport, this.disciplinaUlepsana, this.vrsta, this.minIgraca, this.maxIgraca).subscribe(resp=>{
                  console.log(resp);
                  this.sportoviIdisciplineServis.azurirajSport(traziSport, ukupnoDisciplina).subscribe(resp=>{
                    console.log(resp);
                    this.sportoviIdisciplineServis.dodajFormat(traziSport, this.disciplinaUlepsana, this.ManjeVece, this.brRundi, this.unosFormat, this.minTakm, this.maxTakm).subscribe(resp=>{
                      console.log(resp);
                      this.poruka = "Uspesno dodata nova disciplina!";
                      this.sportoviIdisciplineServis.dohvatiSportove().subscribe((vraceniSportovi: Sport[])=>{
                        this.sportovi = vraceniSportovi;
                      })
                    })
                  })
                })
              })
            })
          }
        })
      }
    }
  }
  
}
