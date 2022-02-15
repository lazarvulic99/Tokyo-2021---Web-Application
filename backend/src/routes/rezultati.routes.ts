import express from 'express';
import { RezultatController } from '../controllers/rezultati.controller';
const rezultatRouter = express.Router();

rezultatRouter.route('/daLiPostojiRezultat').post(
    (req, res)=>new RezultatController().daLiPostojiRezultat(req, res)
);

rezultatRouter.route('/daLiPostojiMec').post(
    (req, res)=>new RezultatController().daLiPostojiMec(req, res)
);

rezultatRouter.route('/dohvatiSveMeceve').post(
    (req, res)=>new RezultatController().dohvatiSveMeceve(req, res)
);

rezultatRouter.route('/kreirajRezultat').post(
    (req, res)=>new RezultatController().kreirajRezultat(req, res)
);

rezultatRouter.route('/dodajMec').post(
    (req, res)=>new RezultatController().dodajMec(req, res)
);

rezultatRouter.route('/dohvatiSveRezultate').get(
    (req, res)=>new RezultatController().dohvatiSveRezultate(req, res)
);

rezultatRouter.route('/dohvatiTrazeneRezultate').post(
    (req, res)=>new RezultatController().dohvatiTrazeneRezultate(req, res)
);

rezultatRouter.route('/dohvatiRezultate').post(
    (req, res)=>new RezultatController().dohvatiRezultate(req, res)
);

rezultatRouter.route('/dohvatiOveRezultate').post(
    (req, res)=>new RezultatController().dohvatiOveRezultate(req, res)
);

rezultatRouter.route('/azurirajRezultat').post(
    (req, res)=>new RezultatController().azurirajRezultat(req, res)
);

rezultatRouter.route('/postaviRepesaz').post(
    (req, res)=>new RezultatController().postaviRepesaz(req, res)
);

rezultatRouter.route('/azurirajRezultatMeca').post(
    (req, res)=>new RezultatController().azurirajRezultatMeca(req, res)
);

export default rezultatRouter;