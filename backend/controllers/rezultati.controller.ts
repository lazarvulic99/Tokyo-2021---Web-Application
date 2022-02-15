import express from 'express';
import Mec from '../models/mec';
import Rezultat from '../models/rezultat';

export class RezultatController{
    daLiPostojiRezultat = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let takmicar = req.body.takmicar;
        Rezultat.findOne({'sport':sport, 'disciplina':disciplina, 'pol': pol, 'takmicar':parseInt(takmicar)}, (err, rezultat)=>{
                if(err) console.log(err);
                else res.json(rezultat);
        })
    }

    daLiPostojiMec = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let brMeca = req.body.brMeca;
        Mec.findOne({'sport':sport, 'disciplina':disciplina, 'pol': pol, 'brMeca':parseInt(brMeca)}, (err, mec)=>{
                if(err) console.log(err);
                else res.json(mec);
        })
    }

    dohvatiSveMeceve = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Mec.find({'sport':sport, 'disciplina':disciplina, 'pol': pol}, (err, mecevi)=>{
                if(err) console.log(err);
                else res.json(mecevi);
        })
    }

    dohvatiSveRezultate = (req: express.Request, res: express.Response)=>{
        Rezultat.find({}, (err, rezultati)=>{
                if(err) console.log(err);
                else res.json(rezultati);
        })
    }

    dohvatiRezultate = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Rezultat.find({'sport':sport, 'disciplina':disciplina, 'pol': pol}, (err, rezultati)=>{
                if(err) console.log(err);
                else res.json(rezultati);
        })
    }

    dohvatiTrazeneRezultate = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Rezultat.find({'sport':sport, 'disciplina':disciplina, 'pol': pol}, (err, rezultati)=>{
                if(err) console.log(err);
                else res.json(rezultati);
        })
    }

    dohvatiOveRezultate = (req: express.Request, res: express.Response)=>{
        let rezultat = req.body.results;
        Rezultat.find({'results': {$regex: rezultat}}, (err, rezultati)=>{
                if(err) console.log(err);
                else res.json(rezultati);
        })
    }

    kreirajRezultat = (req: express.Request, res: express.Response)=>{
        Rezultat.find({}, (err, rezultati)=>{
            if(err)console.log(err);
            else{
                let rez = new Rezultat(req.body);
                rez.save().then(rez=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    dodajMec = (req: express.Request, res: express.Response)=>{
        Mec.find({}, (err, mecevi)=>{
            if(err)console.log(err);
            else{
                let mec = new Mec(req.body);
                mec.save().then(mec=>{
                    res.json({'message':'ok'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    azurirajRezultat = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let takmicar = req.body.takmicar;
        let rezultat = req.body.rezultat;
        Rezultat.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'takmicar':parseInt(takmicar)},{$push: {'results':rezultat}});
        res.json({poruka:'ok'})
    }

    postaviRepesaz = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let takmicar = req.body.takmicar;
        let repesaz = req.body.repesaz;
        let repesazBroj = req.body.repesazBroj;
        Rezultat.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'takmicar':parseInt(takmicar)},{$set: {'repesaz':repesaz, 'repesazBroj':parseInt(repesazBroj), 'trebaRepesaz': 1}});
        res.json({poruka:'ok'})
    }

    azurirajRezultatMeca = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let brMeca = req.body.brMeca;
        let rezultatA = req.body.rezultatA;
        let rezultatB = req.body.rezultatB;
        Mec.collection.updateOne({'sport':sport, 'disciplina':disciplina, 'pol':pol, 'brMeca':parseInt(brMeca)},{$set: {'rezultatA':rezultatA, 'rezultatB':rezultatB, 'zavrsen':1}});
        res.json({poruka:'ok'})
    }
}