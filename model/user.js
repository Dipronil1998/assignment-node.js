const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                console.log("invalid email");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref:"Role"
    },
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
},
    {
        timestamps: true
    })

userSchema.pre('save', async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        console.log(this.password);
    }
    next();
})

//generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}

const User = new mongoose.model('User', userSchema);
module.exports = User;