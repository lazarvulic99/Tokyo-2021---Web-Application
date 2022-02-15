import express from 'express';
import Sportista from '../models/sportista';
import Korisnik from '../models/korisnik';
import Delegiranje from '../models/delegiranje';

export class KorisnikController{
    prijavaNaSistem = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;

        Korisnik.findOne({'kor_ime':kor_ime, 'lozinka': lozinka, 'tip': tip},
            (err, korisnik)=>{
                if(err) console.log(err);
                else res.json(korisnik);
            })
    }

    pronadjiKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;

        Korisnik.findOne({'kor_ime':kor_ime},
            (err, korisnik)=>{
                if(err) console.log(err);
                else res.json(korisnik);
            })
    }

    odobriKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;

        Korisnik.collection.updateOne({'kor_ime': kor_ime},
        {$set: {'odobren':1}});
        res.json({poruka:'ok'})
    }

    dohvatiDelegate = (req: express.Request, res: express.Response)=>{
        Delegiranje.find({'broj':{$lt:3}},
            (err, delegati)=>{
                if(err) console.log(err);
                else res.json(delegati);
            })
    }

    dohvatiSveNeodobreneKorisnike = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'odobren':0},
            (err, neodobreni)=>{
                if(err) console.log(err);
                else res.json(neodobreni);
            })
    }

    pronadjiSportistu = (req: express.Request, res: express.Response)=>{
        let imeIPrezime = req.body.imeIPrezime;

        Sportista.findOne({'imeIPrezime':imeIPrezime},
            (err, sportista)=>{
                if(err) console.log(err);
                else res.json(sportista);
            })
    }

    dohvatiSveSportiste = (req: express.Request, res: express.Response)=>{
        Sportista.find({}, (err, sportisti)=>{
                if(err) console.log(err);
                else res.json(sportisti);
        })
    }

    vecPostojiVodja = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        let tip = req.body.tip;
        console.log(zemlja);
        console.log(tip);
        Korisnik.findOne({'zemlja':zemlja, 'tip': tip},
            (err, korisnik)=>{
                if(err)console.log(err);
                else res.json(korisnik);
            })
    }

    dodajKorisnika = (req: express.Request, res: express.Response)=>{
        Korisnik.find({}, (err, korisnici)=>{
            if(err)console.log(err);
            else{
                let kor = new Korisnik(req.body);
                kor.save().then(kor=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    povecajBrojDeligaranja = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        Delegiranje.collection.updateOne({'ime': ime, 'prezime':prezime},
        {$inc: {'broj':1}});
        res.json({poruka:'ok'})
    }

    postaviDisccipline = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let disc = req.body.disciplina;
        Delegiranje.collection.updateOne({'ime': ime, 'prezime':prezime},
        {$push: {'discipline':disc}});
        res.json({poruka:'ok'})
    }

    napraviRekordZaDelegiranje = (req: express.Request, res: express.Response)=>{
        Delegiranje.find({}, (err, delegiranja)=>{
            if(err)console.log(err);
            else{
                let del = new Delegiranje(req.body);
                del.save().then(del=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    dodajSportistu = (req: express.Request, res: express.Response)=>{
        Sportista.find({}, (err, sportisti)=>{
            if(err)console.log(err);
            else{
                let noviSportista = new Sportista(req.body);
                noviSportista.save().then(noviSportista=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    azurirajLozinku = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        Korisnik.collection.updateOne({'kor_ime':kor_ime},{$set:{'lozinka':lozinka}});
        res.json({poruka:'ok'});
    }

    azurirajSportistiDiscipline = (req: express.Request, res: express.Response)=>{
        let imeIPrezime = req.body.imeIPrezime;
        let disciplina = req.body.disciplina;
        Sportista.collection.updateOne({'imeIPrezime':imeIPrezime},{$push:{'discipline':disciplina}});
        res.json({poruka:'ok'});
    }

    dodajDisciplinu = (req: express.Request, res: express.Response)=>{
        let imeIPrezime = req.body.imeIPrezime;
        let disciplina = req.body.disciplina;
        Sportista.collection.updateOne({'imeIPrezime':imeIPrezime},{$push:{'discipline':disciplina}});
        res.json({poruka:'ok'});
    }
}