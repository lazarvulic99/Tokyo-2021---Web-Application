import express from 'express';
import Rekord from '../models/rekord';

export class RekordiController{
    dohvatiSveRekorde = (req: express.Request, res: express.Response)=>{
        let pol = req.body.pol;
        Rekord.find({'pol':pol}, (err, rekordi)=>{
                if(err) console.log(err);
                else res.json(rekordi);
        })
    }
}