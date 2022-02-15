import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sportista = new Schema(
    {
        idSportiste:{
            type: Number
        },
        imeIPrezime: {
            type: String
        },
        pol: {
            type: String
        },
        nacionalnost:{
            type: String
        },
        sport: {
            type: String
        },
        discipline: {
            type: Array
        },
        medalja: {
            type: Number
        }
    }
);

export default mongoose.model('Sportista', Sportista, 'sportisti');