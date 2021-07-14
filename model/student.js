const mongoose = require('mongoose');
var validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,

    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'School',
        required: true,
    }
},
    {
        timestamps: true
    })

const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;