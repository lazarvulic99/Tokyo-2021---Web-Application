import express from 'express';
import Format from '../models/format';
import Disciplina from '../models/disciplina';
import Sport from '../models/sport';

export class SportoviIdisciplineController{
    dohvatiSportove = (req: express.Request, res: express.Response)=>{
        Sport.find({}, (err, sport)=>{
                if(err) console.log(err);
                else res.json(sport);
        })
    }

    dohvatiEkipneSportove = (req: express.Request, res: express.Response)=>{
        Disciplina.find({'vrsta':'e'}, (err, sportoviIDiscipline)=>{
                if(err) console.log(err);
                else res.json(sportoviIDiscipline);
        })
    }

    dohvatiDisciplineZaSport = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        Disciplina.find({'sport': sport}, (err, discipline)=>{
                if(err) console.log(err);
                else res.json(discipline);
        })
    }

    dohvatiEkipneDisciplineZaSport = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let vrsta = req.body.vrsta;
        Disciplina.find({'sport': sport, 'vrsta':vrsta}, (err, discipline)=>{
                if(err) console.log(err);
                else res.json(discipline);
        })
    }

    dohvatiDiscipline = (req: express.Request, res: express.Response)=>{
        Disciplina.find({}, (err, discipline)=>{
                if(err) console.log(err);
                else res.json(discipline);
        })
    }

    dohvatiTrazenuDisciplinu = (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let sport = req.body.sport;
        Disciplina.findOne({'sport': sport, 'disciplina': disciplina}, (err, disc)=>{
                if(err) console.log(err);
                else res.json(disc);
        })
    }

    proveriTipZaDisciplinu = (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let sport = req.body.sport;
        Disciplina.findOne({'sport': sport, 'disciplina': disciplina}, (err, disc)=>{
                if(err) console.log(err);
                else res.json(disc);
        })
    }

    dodajDisciplinu = (req: express.Request, res: express.Response)=>{
        Disciplina.find({}, (err, discipline)=>{
                if(err) console.log(err);
                else{
                    //let broj = discipline.length + 1;
                    let disc = new Disciplina(req.body);
                    //disc.idDis = broj; Ovo se crveni iako ne bi trebalo
                    disc.save().then(disc=>{
                        res.json({'message': 'ok'})
                    }).catch(err=>{
                        res.json(err);
                    })
                }
        })
    }

    dodajFormat = (req: express.Request, res: express.Response)=>{
        console.log(req.body);
        Format.find({}, (err, formati)=>{
                if(err) console.log(err);
                else{
                    //let broj = discipline.length + 1;
                    let format = new Format(req.body);
                    //disc.idDis = broj; Ovo se crveni iako ne bi trebalo
                    format.save().then(format=>{
                        res.json({'message': 'ok'})
                    }).catch(err=>{
                        res.json(err);
                    })
                }
        })
    }

    dodajSport = (req: express.Request, res: express.Response)=>{
        Sport.find({}, (err, sportovi)=>{
                if(err) console.log(err);
                else{
                    //let broj = sportovi.length + 1;
                    let sport = new Sport(req.body);
                    //sport.idSporta = broj; //Ovo se crveni iako ne bi trebalo
                    sport.save().then(sport=>{
                        res.json({'message': 'ok'})
                    }).catch(err=>{
                        res.json(err);
                    })
                }
        })
    }

    azurirajSport = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.broj;
        Sport.collection.updateOne({'sport':sport},{$push: {'discipline':disciplina}});
        res.json({poruka:'ok'})
    }

    dohvatiFormatSporta = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        Format.findOne({'sport':sport, 'disciplina': disciplina}, (err, format)=>{
            if(err) console.log(err)
            else res.json(format);
        })
    }

}