import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Format = new Schema(
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        ManjeVece: {
            type: Number
        },
        brRundi: {
            type: Number
        },
        format: {
            type: String
        },
        min:{
            type: Number
        },
        max: {
            type: Number
        }
    }
);

export default mongoose.model('Format', Format, 'formati');