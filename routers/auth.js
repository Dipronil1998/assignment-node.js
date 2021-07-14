const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = new express.Router();
const User = require("../model/user");
router.use(express.json({}));


// Register a User
router.post("/user/signup", async (req, res) => {
    try {
        const { name, email, phone, password, roleId } = req.body
        if (!name || !email || !phone || !password || !roleId) {
            res.status(400).json({ error: "Fill all Fields" })
        }

        const user = new User(req.body);
        const token = await user.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        const createuser = await user.save();
        res.status(201).json({ success: "user registration successfully" })
    } catch (error) {
        res.status(400).send(error)
    }
})


// Login a user
router.post("/user/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Fill all Fields" })
        }
        const emailuser = await User.findOne({ "email": email });
        if (emailuser) {
            const isValid = await bcrypt.compare(password, emailuser.password);
            const token = await emailuser.generateAuthToken();
            res.cookie("jetoken", token, {
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            if (isValid) {
                res.status(200).json({ success: "Login Successfully" })
            } else {
                res.status(400).json({ error: "Invalid Credientials" })
            }
        } else {
            res.json({ error: "User not exist" })
        }
    } catch (error) {
        res.json({ error: "Invalid Email" })
    }
})

router.get('/user', async (req, res) => {
    // console.log(req.body);
    try {
        const data = await User.find();
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/user/:id', async (req, res) => {
    // console.log(req.body);
    try {
        const _id = req.params.id;
        const data = await User.findById({ '_id': _id });
        if (!data) {
            res.json({"message":"nannot find"})
        } else {
            res.status(200).send(data);
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router