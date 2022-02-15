import express from 'express';
import { MedaljeController } from '../controllers/medalje.controller';
const medaljeRouter = express.Router();

medaljeRouter.route('/dohvatiMedalje').get(
    (req, res)=>new MedaljeController().dohvatiMedalje(req, res)
);

medaljeRouter.route('/dohvatiZemlju').post(
    (req, res)=>new MedaljeController().dohvatiZemlju(req, res)
);

 medaljeRouter.route('/napraviMedalju').post(
    (req, res)=>new MedaljeController().napraviMedalju(req, res)
);

medaljeRouter.route('/azurirajZlatne').post(
    (req, res)=>new MedaljeController().azurirajZlatne(req, res)
);

medaljeRouter.route('/azurirajSrebrne').post(
    (req, res)=>new MedaljeController().azurirajSrebrne(req, res)
);

medaljeRouter.route('/azurirajBronzane').post(
    (req, res)=>new MedaljeController().azurirajBronzane(req, res)
);

medaljeRouter.route('/azurirajZemljiRang').post(
    (req, res)=>new MedaljeController().azurirajZemljiRang(req, res)
);

export default medaljeRouter;