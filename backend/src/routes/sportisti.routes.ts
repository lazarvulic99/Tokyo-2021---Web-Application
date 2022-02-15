import express from 'express';
import { SportistiController } from '../controllers/sportisti.controller';
const sportistiRouter = express.Router();

sportistiRouter.route('/traziSportiste').post(
    (req, res)=>new SportistiController().traziSportiste(req, res)
);

sportistiRouter.route('/dohvatiPrijavljeneSportiste').post(
    (req, res)=>new SportistiController().dohvatiPrijavljeneSportiste(req, res)
);

sportistiRouter.route('/osvojioMedalju').post(
    (req, res)=>new SportistiController().osvojioMedalju(req, res)
);

sportistiRouter.route('/dohvatiPrijavljeneSportisteZaVodju').post(
    (req, res)=>new SportistiController().dohvatiPrijavljeneSportisteZaVodju(req, res)
);

sportistiRouter.route('/dohvatiBrojTakmicaraZaSport').post(
    (req, res)=>new SportistiController().dohvatiBrojTakmicaraZaSport(req, res)
);

sportistiRouter.route('/dohvatiMojeSportiste').post(
    (req, res)=>new SportistiController().dohvatiMojeSportiste(req, res)
);

sportistiRouter.route('/dohvatiSportistu').post(
    (req, res)=>new SportistiController().dohvatiSportistu(req, res)
);

export default sportistiRouter;