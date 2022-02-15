import express from 'express';
import Sportista from '../models/sportista';

export class SportistiController{
    traziSportiste = (req: express.Request, res: express.Response)=>{
        let imeIPrezime = req.body.imeIPrezime;
        let pol = req.body.pol;
        let nacionalnost = req.body.nacionalnost;
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let medalja = req.body.medalja;

       /*  console.log(imeIPrezime);        
        console.log(pol);        
        console.log(nacionalnost);        
        console.log(sport);        
        console.log(discipline);        
        console.log(medalja); */

        let broj = parseInt(medalja);
        //console.log(broj);
        
        if(sport == null){ // Tada je i disciplina null
            if(nacionalnost == null){
                if(pol == null){
                    if(imeIPrezime == null){
                        if(broj == 1){
                            Sportista.find({'medalja': 1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {
                                res.json(sportisti);}})
                        }else{
                            Sportista.find({}, (err, sportisti)=>{
                            if(err)console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }else{
                        if(broj == 1){
                            Sportista.find({'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'imeIPrezime': {$regex: imeIPrezime}},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }
                }else{
                    if(imeIPrezime == null){
                        if(broj == 1){
                            Sportista.find({'pol': pol, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'pol':pol},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }else{
                        if(broj == 1){
                            Sportista.find({'imeIPrezime':{$regex: imeIPrezime},'pol': pol, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'imeIPrezime':{$regex: imeIPrezime},'pol': pol},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }
                }
            }else{
                if(imeIPrezime == null){
                    if(pol == null){
                        if(broj == 1){
                            Sportista.find({'nacionalnost':nacionalnost,'medalja': 1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'nacionalnost':nacionalnost},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }else{
                        if(broj == 1){
                            Sportista.find({'nacionalnost':nacionalnost,'pol': pol, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'nacionalnost':nacionalnost,'pol': pol},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }
                }else{
                    if(pol == null){
                        if(broj == 1){
                            Sportista.find({'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }else{
                        if(broj == 1){
                            Sportista.find({'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol, 'medalja':1},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }else{
                            Sportista.find({'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol},
                            (err, sportisti)=>{
                            if(err) console.log(err);
                            else {res.json(sportisti);}})
                        }
                    }
                }
            }
        }else{
            if(discipline == null){
                if(nacionalnost == null){
                    if(pol == null){
                        if(imeIPrezime == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport, 'medalja': 1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {
                                    res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {
                                    res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport ,'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'imeIPrezime': {$regex: imeIPrezime}},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }else{
                        if(imeIPrezime == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'pol':pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'imeIPrezime':{$regex: imeIPrezime},'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'imeIPrezime':{$regex: imeIPrezime},'pol': pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }
                }else{
                    if(imeIPrezime == null){
                        if(pol == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'medalja': 1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'pol': pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }else{
                        if(pol == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }
                }
            }else{
                if(nacionalnost == null){
                    if(pol == null){
                        if(imeIPrezime == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline}, 'medalja': 1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {
                                    res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline}},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {
                                    res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'imeIPrezime': {$regex: imeIPrezime}},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }else{
                        if(imeIPrezime == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'pol':pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'imeIPrezime':{$regex: imeIPrezime},'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'imeIPrezime':{$regex: imeIPrezime},'pol': pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }
                }else{
                    if(imeIPrezime == null){
                        if(pol == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'medalja': 1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'pol': pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'pol': pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }else{
                        if(pol == null){
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime}},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }else{
                            if(broj == 1){
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol, 'medalja':1},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }else{
                                Sportista.find({'sport':sport,'discipline':{$regex: discipline},'nacionalnost':nacionalnost,'imeIPrezime': {$regex: imeIPrezime},'pol':pol},
                                (err, sportisti)=>{
                                if(err) console.log(err);
                                else {res.json(sportisti);}})
                            }
                        }
                    }
                }
            }
        }
    }

    dohvatiPrijavljeneSportiste = (req: express.Request, res: express.Response)=>{
        let pol = req.body.pol;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        Sportista.find({'pol':pol,'discipline':{$regex: disciplina},'sport':sport},
            (err, sportisti)=>{
            if(err) console.log(err);
            else {res.json(sportisti);}})
    }

    dohvatiPrijavljeneSportisteZaVodju = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        let pol = req.body.pol;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        Sportista.find({'nacionalnost':zemlja, 'pol':pol,'discipline':{$regex: disciplina},'sport':sport},
            (err, sportisti)=>{
            if(err) console.log(err);
            else {res.json(sportisti);}})
    }

    dohvatiMojeSportiste = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        Sportista.find({'nacionalnost':zemlja},
            (err, sportisti)=>{
            if(err) console.log(err);
            else {res.json(sportisti);}})
    }

    dohvatiSportistu = (req: express.Request, res: express.Response)=>{
        let idSportiste = req.body.idSportiste;
        Sportista.findOne({'idSportiste':idSportiste},
            (err, sportista)=>{
            if(err) console.log(err);
            else {res.json(sportista);}})
    }

    osvojioMedalju = (req: express.Request, res: express.Response)=>{
        let idSportiste = req.body.idSportiste;
        Sportista.collection.updateOne({'idSportiste': idSportiste},{$set:{'medalja':1}});
        res.json({poruka:'ok'});
    }

    dohvatiBrojTakmicaraZaSport = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        Sportista.find({'nacionalnost':zemlja, 'sport': sport},
            (err, sportisti)=>{
            if(err) console.log(err);
            else {res.json(sportisti);}})
    }
}