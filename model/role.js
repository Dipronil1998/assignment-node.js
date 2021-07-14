const mongoose = require('mongoose');
var validator = require('validator');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    scopes: {
        type: Array
    }
},
    {
        timestamps: true
    })

const Role = new mongoose.model('Role', roleSchema);
module.exports = Role;