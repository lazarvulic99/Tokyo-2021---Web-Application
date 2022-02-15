import express from 'express';
import Ekipa from '../models/ekipa';

export class EkipaController{
    dodajEkipu = (req: express.Request, res: express.Response)=>{
        Ekipa.find({}, (err, ekipe)=>{
            if(err)console.log(err);
            else{
                let ek = new Ekipa(req.body);
                ek.save().then(ek=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    pronadjiPostojecuEkipu = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Ekipa.findOne({'zemlja':zemlja, 'sport': sport, 'disciplina':disciplina, 'pol': pol},
            (err, ekipa)=>{
                if(err) console.log(err);
                else res.json(ekipa);
            })
    }
}