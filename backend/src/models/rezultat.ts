import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rezultat = new Schema(
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
        takmicar: {
            type: Number
        },
        results: {
            type: Array
        },
        repesaz: {
            type: String
        },
        repesazBroj: {
            type: Number
        },
        trebaRepesaz: {
            type: Number
        }
    }
);

export default mongoose.model('Rezultat', Rezultat, 'rezultati');
