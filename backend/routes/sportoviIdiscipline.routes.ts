import express from 'express';
import { SportoviIdisciplineController } from '../controllers/sportoviIdiscipline.controller';
const sportoviIdisciplineRouter = express.Router();

sportoviIdisciplineRouter.route('/dohvatiSportove').get(
    (req, res)=>new SportoviIdisciplineController().dohvatiSportove(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiEkipneSportove').get(
    (req, res)=>new SportoviIdisciplineController().dohvatiEkipneSportove(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiDisciplineZaSport').post(
    (req, res)=>new SportoviIdisciplineController().dohvatiDisciplineZaSport(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiEkipneDisciplineZaSport').post(
    (req, res)=>new SportoviIdisciplineController().dohvatiEkipneDisciplineZaSport(req, res)
)

sportoviIdisciplineRouter.route('/dodajDisciplinu').post(
    (req, res)=>new SportoviIdisciplineController().dodajDisciplinu(req, res)
)

sportoviIdisciplineRouter.route('/dodajFormat').post(
    (req, res)=>new SportoviIdisciplineController().dodajFormat(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiFormatSporta').post(
    (req, res)=>new SportoviIdisciplineController().dohvatiFormatSporta(req, res)
)

sportoviIdisciplineRouter.route('/dodajSport').post(
    (req, res)=>new SportoviIdisciplineController().dodajSport(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiDiscipline').get(
    (req, res)=>new SportoviIdisciplineController().dohvatiDiscipline(req, res)
)

sportoviIdisciplineRouter.route('/dohvatiTrazenuDisciplinu').post(
    (req, res)=>new SportoviIdisciplineController().dohvatiTrazenuDisciplinu(req, res)
)

sportoviIdisciplineRouter.route('/proveriTipZaDisciplinu').post(
    (req, res)=>new SportoviIdisciplineController().proveriTipZaDisciplinu(req, res)
)

sportoviIdisciplineRouter.route('/azurirajSport').post(
    (req, res)=>new SportoviIdisciplineController().azurirajSport(req, res)
)

export default sportoviIdisciplineRouter;