import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        idZemlje:{
            type: Number
        },
        zemlja: {
            type: String
        },
        skracenica: {
            type: String
        },
        brojSportista: {
            type: Number
        }
    }
);

export default mongoose.model('Zemlja', Zemlja, 'zemlje');