import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Mec = new Schema(
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        mec: {
            type: Object
        },
        rezultatA: {
            type: Number
        },
        rezultatB: {
            type: Number
        },
        brMeca: {
            type: Number
        },
        zavrsen: {
            type: Number
        },
        tip: {
            type: String
        }
    }
);

export default mongoose.model('Mec', Mec, 'mecevi');