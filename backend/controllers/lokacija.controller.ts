import express from 'express';
import Lokacija from '../models/lokacija';

export class LokacijeController{
    dohvatiLokacije = (req: express.Request, res: express.Response)=>{
            Lokacija.find({}, (err, lokacije)=>{
                if(err) console.log(err);
                else res.json(lokacije);
        })
    }
}