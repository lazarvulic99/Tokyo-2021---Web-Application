import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Disciplina = new Schema(
    {
        idDis:{
            type: Number
        },
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        vrsta:{
            type: String
        },
        minIgraca: {
            type: Number
        },
        maxIgraca: {
            type: Number
        }
    }
);

export default mongoose.model('Disciplina', Disciplina, 'discipline');