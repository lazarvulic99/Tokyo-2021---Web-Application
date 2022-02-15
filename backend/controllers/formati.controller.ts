import express from 'express';
import Format from '../models/format';

export class FormatController{
    dohvatiFormat = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        Format.findOne({'sport':sport, 'disciplina': disciplina},
            (err, format)=>{
                if(err) console.log(err);
                else res.json(format);
            })
    }
}