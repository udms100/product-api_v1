import mongoose from 'mongoose';
import Review from './review';
let Schema = mongoose.Schema;

let compareSchema = new Schema({
    pharmacy_name: {
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    discount_price: {
        type: Number,
        required: true
    },
    generic: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
    },
    estimated_price: {
        type: Number,
        required: true
    },
    geometry:{
      type: {type: String, default: 'point'},
      coordinates: [Number]
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});


module.exports = mongoose.model('compare', compareSchema);
