import express from 'express';
import Takmicenje from '../models/takmicenje';

export class TakmicenjaController{
    dohvatiTakmicenje = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        Takmicenje.findOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, (err, takmicenje)=>{
                if(err) console.log(err);
                else res.json(takmicenje);
        })
    }

    proveriPreklapanja = (req: express.Request, res: express.Response)=>{
        let datumPocetka = req.body.datumPocetka;
        let vremePocetka = req.body.vremePocetka;
        Takmicenje.find({'datumPocetka':datumPocetka, 'vremePocetka':vremePocetka}, (err, takmicenja)=>{
                if(err) console.log(err);
                else res.json(takmicenja);
        })
    }

    dohvatiFormiranaTakmicenja = (req: express.Request, res: express.Response)=>{
        Takmicenje.find({'formirano':1}, (err, takmicenje)=>{
                if(err) console.log(err);
                else res.json(takmicenje);
        })
    }

    dohvatiSvaTakmicenja = (req: express.Request, res: express.Response)=>{
        Takmicenje.find({}, (err, takmicenja)=>{
                if(err) console.log(err);
                else res.json(takmicenja);
        })
    }

    dohvatiDelegatovaTakmicenja = (req: express.Request, res: express.Response)=>{
        let imeDelegata = req.body.imeDelegata;
        Takmicenje.find({'delegat':{$regex: imeDelegata}}, (err, takmicenja)=>{
                if(err) console.log(err);
                else res.json(takmicenja);
        })
    }

    proveriDaLiJeFormirano = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Takmicenje.findOne({'sport':sport, 'disciplina':disciplina, 'pol':pol}, (err, takmicenje)=>{
                if(err) console.log(err);
                else res.json(takmicenje);
        })
    }

    azurirajTakmicenje = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        let datumPocetka = req.body.datumPocetka;
        let datumKraja = req.body.datumKraja;
        let loakcije = req.body.lokacije;
        let format = req.body.format;
        Takmicenje.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, {$set: {'datumPocetka':datumPocetka, 'format':format, 'datumKraja':datumKraja,'lokacije':loakcije, 'formirano':1}});
        res.json({poruka:'ok'})
    }

    dodajDatumIVreme = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        let datumPocetka = req.body.datumPocetka;
        let vremePocetka = req.body.vremePocetka;
        Takmicenje.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, {$set: {'datumPocetka':datumPocetka, 'vremePocetka':vremePocetka}});
        res.json({poruka:'ok'})
    }

    formirajTakm = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        Takmicenje.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, {$set: {'formirano':1}});
        res.json({poruka:'ok'})
    }

    dodajDelegate = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        let delegati = req.body.delegati;
        Takmicenje.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, {$set: {'delegat':delegati}});
        res.json({poruka:'ok'})
    }

    dodajTakmicenje = (req: express.Request, res: express.Response)=>{
        Takmicenje.find({}, (err, takmicenja)=>{
            if(err)console.log(err);
            else{
                let tak = new Takmicenje(req.body);
                tak.save().then(tak=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    dodajSportiste = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let tip = req.body.tip;
        let sportisti = req.body.sportisti;
        Takmicenje.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'tip':tip}, {$set: {'takmicari':sportisti}});
        res.json({poruka:'ok'})
    }

    dohvatiBrojJavljanjaDelegata = (req: express.Request, res: express.Response)=>{
        let delegat = req.body.delegat;
        Takmicenje.find({'delegat':{$regex: delegat}}, (err, podatak)=>{
                if(err) console.log(err);
                else res.json(podatak);
        })
    }
}