import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRouter = express.Router();

korisnikRouter.route('/prijavaNaSistem').post(
    (req, res)=>new KorisnikController().prijavaNaSistem(req, res)
);

korisnikRouter.route('/vecPostojiVodja').post(
    (req, res)=>new KorisnikController().vecPostojiVodja(req, res)
)

korisnikRouter.route('/dodajKorisnika').post(
    (req, res)=>new KorisnikController().dodajKorisnika(req, res)
)

korisnikRouter.route('/napraviRekordZaDelegiranje').post(
    (req, res)=>new KorisnikController().napraviRekordZaDelegiranje(req, res)
)

korisnikRouter.route('/dodajSportistu').post(
    (req, res)=>new KorisnikController().dodajSportistu(req, res)
)

korisnikRouter.route('/dodajDisciplinu').post(
    (req, res)=>new KorisnikController().dodajDisciplinu(req, res)
)

korisnikRouter.route('/pronadjiKorisnika').post(
    (req, res)=>new KorisnikController().pronadjiKorisnika(req, res)
)

korisnikRouter.route('/dohvatiDelegate').get(
    (req, res)=>new KorisnikController().dohvatiDelegate(req, res)
)

korisnikRouter.route('/dohvatiSveSportiste').get(
    (req, res)=>new KorisnikController().dohvatiSveSportiste(req, res)
)

korisnikRouter.route('/dohvatiSveNeodobreneKorisnike').get(
    (req, res)=>new KorisnikController().dohvatiSveNeodobreneKorisnike(req, res)
)

korisnikRouter.route('/pronadjiSportistu').post(
    (req, res)=>new KorisnikController().pronadjiSportistu(req, res)
)

korisnikRouter.route('/odobriKorisnika').post(
    (req, res)=>new KorisnikController().odobriKorisnika(req, res)
)

korisnikRouter.route('/postaviDisccipline').post(
    (req, res)=>new KorisnikController().postaviDisccipline(req, res)
)

korisnikRouter.route('/povecajBrojDeligaranja').post(
    (req, res)=>new KorisnikController().povecajBrojDeligaranja(req, res)
)

korisnikRouter.route('/azurirajLozinku').post(
    (req, res)=>new KorisnikController().azurirajLozinku(req, res)
)

korisnikRouter.route('/azurirajSportistiDiscipline').post(
    (req, res)=>new KorisnikController().azurirajSportistiDiscipline(req, res)
)

export default korisnikRouter;