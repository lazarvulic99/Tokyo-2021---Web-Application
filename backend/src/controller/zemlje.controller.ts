import express from 'express';
import Zemlja from '../models/zemlja';

export class ZemljeController{
    dohvatiZemlje = (req: express.Request, res: express.Response)=>{
        Zemlja.find({}, (err, zemlje)=>{
                if(err) console.log(err);
                else res.json(zemlje);
        })
    }

    povecajBrojSportista = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Zemlja.collection.updateOne({'zemlja': zemlja}, {$inc: {'brojSportista':1}});
        res.json({poruka:'ok'})
    }
}