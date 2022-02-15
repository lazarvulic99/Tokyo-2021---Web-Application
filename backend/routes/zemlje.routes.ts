import express from 'express';
import { ZemljeController } from '../controllers/zemlje.controller';
const zemljeRouter = express.Router();

zemljeRouter.route('/dohvatiZemlje').get(
    (req, res)=>new ZemljeController().dohvatiZemlje(req, res)
);

zemljeRouter.route('/povecajBrojSportista').post(
    (req, res)=>new ZemljeController().povecajBrojSportista(req, res)
);

export default zemljeRouter;