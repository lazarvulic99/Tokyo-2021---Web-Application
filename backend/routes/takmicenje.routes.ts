import express from 'express';
import { TakmicenjaController } from '../controllers/takmicenja.controller';
const takmicenjaRouter = express.Router();

takmicenjaRouter.route('/dohvatiTakmicenje').post(
    (req, res)=>new TakmicenjaController().dohvatiTakmicenje(req, res)
)

takmicenjaRouter.route('/proveriPreklapanja').post(
    (req, res)=>new TakmicenjaController().proveriPreklapanja(req, res)
)

takmicenjaRouter.route('/proveriDaLiJeFormirano').post(
    (req, res)=>new TakmicenjaController().proveriDaLiJeFormirano(req, res)
)

takmicenjaRouter.route('/azurirajTakmicenje').post(
    (req, res)=>new TakmicenjaController().azurirajTakmicenje(req, res)
)

takmicenjaRouter.route('/dodajDelegate').post(
    (req, res)=>new TakmicenjaController().dodajDelegate(req, res)
)

takmicenjaRouter.route('/formirajTakm').post(
    (req, res)=>new TakmicenjaController().formirajTakm(req, res)
)

takmicenjaRouter.route('/dodajDatumIVreme').post(
    (req, res)=>new TakmicenjaController().dodajDatumIVreme(req, res)
)

takmicenjaRouter.route('/dohvatiDelegatovaTakmicenja').post(
    (req, res)=>new TakmicenjaController().dohvatiDelegatovaTakmicenja(req, res)
)

takmicenjaRouter.route('/dodajTakmicenje').post(
    (req, res)=>new TakmicenjaController().dodajTakmicenje(req, res)
)

takmicenjaRouter.route('/dodajSportiste').post(
    (req, res)=>new TakmicenjaController().dodajSportiste(req, res)
)

takmicenjaRouter.route('/dohvatiFormiranaTakmicenja').get(
    (req, res)=>new TakmicenjaController().dohvatiFormiranaTakmicenja(req, res)
)

takmicenjaRouter.route('/dohvatiSvaTakmicenja').get(
    (req, res)=>new TakmicenjaController().dohvatiSvaTakmicenja(req, res)
)

takmicenjaRouter.route('/dohvatiBrojJavljanjaDelegata').post(
    (req, res)=>new TakmicenjaController().dohvatiBrojJavljanjaDelegata(req, res)
)

export default takmicenjaRouter;