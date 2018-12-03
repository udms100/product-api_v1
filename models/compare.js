const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Geolocation Schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        createIndexes: "2dsphere"
    }
});

//  compare Schema & model
const CompareSchema = new Schema({
    brand:{
        type: String,
        required: true
    },
    price: {
        type:String
    },
    name: {
        type: String,
        required: true
    },
    geometry: GeoSchema

    // add geolocation
});

const Compare = mongoose.model('compare', CompareSchema);

module.exports = Compare;