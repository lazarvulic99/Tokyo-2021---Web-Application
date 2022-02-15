import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
    {
        sport:{
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        tip:{
            type: String
        },
        datumPocetka:{
            type: String
        },
        datumKraja:{
            type: String
        },
        vremePocetka: {
            type: String
        },
        vremeKraja: {
            type: String
        },
        lokacije: {
            type: Array
        },
        format: {
            type: String
        },
        delegat: {
            type: Array
        },
        ekipe: {
            type: Array
        },
        takmicari: {
            type: Array
        },
        formirano: {
            type: Number
        }
    }
);

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenja');