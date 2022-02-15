import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Medalja = new Schema(
    {
        ranking: {
            type: Number
        },
        zemlja: {
            type: String
        },
        brojZlatnih: {
            type: Number
        },
        brojSrebrnih: {
            type: Number
        },
        brojBronzanih: {
            type: Number
        },
        ukupno: {
            type: Number
        }
    }
);

export default mongoose.model('Medalja', Medalja, 'medalje');