const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocation scheme
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

// create ninja scheme & model
const NinjaScheme = new Schema({
    username: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', NinjaScheme);

module.exports = Ninja;