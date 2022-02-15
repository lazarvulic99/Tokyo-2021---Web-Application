import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import korisnikRouter from './routes/korisnik.routes';
import sportoviIdisciplineRouter from './routes/sportoviIdiscipline.routes';
import rekordiRouter from './routes/rekordi.routes';
import zemljeRouter from './routes/zemlje.routes';
import sportistiRouter from './routes/sportisti.routes';
import medaljeRouter from './routes/medalje.routes';
import lokacijeRouter from './routes/lokacija.routes';
import takmicenjaRouter from './routes/takmicenje.routes';
import ekipaRouter from './routes/ekipa.routes';
import formatRouter from './routes/formati.routes';
import rezultatRouter from './routes/rezultati.routes';
const app = express();
app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb://localhost:27017/Projekat');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Povezivanje na mongoDB bazu je uspesno!')
});

const router = express.Router();

app.use('/', router);
router.use('/korisnici', korisnikRouter)
router.use('/sportoviIdiscipline', sportoviIdisciplineRouter)
router.use('/rekordi', rekordiRouter)
router.use('/zemlje', zemljeRouter)
router.use('/sportisti', sportistiRouter)
router.use('/medalje', medaljeRouter)
router.use('/lokacije', lokacijeRouter)
router.use('/takmicenja', takmicenjaRouter)
router.use('/ekipe', ekipaRouter)
router.use('/formati', formatRouter)
router.use('/rezultati', rezultatRouter)
app.listen(4000, () => console.log(`Express server running on port 4000`));