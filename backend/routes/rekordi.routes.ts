import express from 'express';
import { RekordiController } from '../controllers/rekordi.controller';
const rekordiRouter = express.Router();

rekordiRouter.route('/dohvatiSveRekorde').post(
    (req, res)=>new RekordiController().dohvatiSveRekorde(req, res)
);

export default rekordiRouter;