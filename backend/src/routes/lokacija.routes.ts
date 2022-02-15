import express from 'express';
import { LokacijeController } from '../controllers/lokacija.controller';
const lokacijeRouter = express.Router();

lokacijeRouter.route('/dohvatiLokacije').get(
    (req, res)=>new LokacijeController().dohvatiLokacije(req, res)
);

export default lokacijeRouter;