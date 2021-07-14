const mongoose = require('mongoose');
var validator = require('validator');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    })

const School = new mongoose.model('School', schoolSchema);
module.exports = School;