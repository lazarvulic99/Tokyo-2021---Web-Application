import express from 'express';
import { FormatController } from '../controllers/formati.controller';
const formatRouter = express.Router();

formatRouter.route('/dohvatiFormat').post(
    (req, res)=>new FormatController().dohvatiFormat(req, res)
)

export default formatRouter;