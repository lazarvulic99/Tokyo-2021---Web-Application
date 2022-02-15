import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delegiranje = new Schema(
    {
        kor_ime: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        broj: {
            type: Number
        },
        discipline: {
            type: Array
        }
    }
);

export default mongoose.model('Delegiranje', Delegiranje, 'delegiranja');