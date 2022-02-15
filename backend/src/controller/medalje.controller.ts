import express from 'express';
import Medalja from '../models/medalja';

export class MedaljeController{
    dohvatiMedalje = (req: express.Request, res: express.Response)=>{
        Medalja.find({}, (err, medalje)=>{
                if(err) console.log(err);
                else res.json(medalje);
        })
    }

    dohvatiZemlju = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Medalja.findOne({'zemlja':zemlja}, (err, medalja)=>{
                if(err) console.log(err);
                else res.json(medalja);
        })
    }
 
    napraviMedalju = (req: express.Request, res: express.Response)=>{
        Medalja.find({}, (err, medalje)=>{
            if(err)console.log(err);
            else{
                let med = new Medalja(req.body);
                med.save().then(med=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    azurirajZlatne = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'brojZlatnih':1, 'ukupno':1}});
        //Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'ukupno':1}});
        res.json({poruka:'ok'})
    }

    azurirajSrebrne = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'brojSrebrnih':1, 'ukupno':1}});
        //Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'ukupno':1}});
        res.json({poruka:'ok'})
    }

    azurirajBronzane = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'brojBronzanih':1, 'ukupno':1}});
        //Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'ukupno':1}});
        res.json({poruka:'ok'})
    }

    azurirajZemljiRang = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        let rang = req.body.rang;
        Medalja.collection.updateOne({'zemlja': zemlja}, {$set: {'ranking':parseInt(rang)}});
        //Medalja.collection.updateOne({'zemlja': zemlja}, {$inc: {'ukupno':1}});
        res.json({poruka:'ok'})
    }
    
}