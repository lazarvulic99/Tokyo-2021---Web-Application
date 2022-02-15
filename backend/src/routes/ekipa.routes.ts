import express from 'express';
import { EkipaController } from '../controllers/ekipa.controller';
const ekipaRouter = express.Router();

ekipaRouter.route('/dodajEkipu').post(
    (req, res)=>new EkipaController().dodajEkipu(req, res)
)

ekipaRouter.route('/pronadjiPostojecuEkipu').post(
    (req, res)=>new EkipaController().pronadjiPostojecuEkipu(req, res)
)


export default ekipaRouter;