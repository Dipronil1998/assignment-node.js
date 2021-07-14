const express = require('express');
const router= new express.Router();
const Role = require('../model/role');





//create operation
router.post('/role', async (req, res) => {
    // console.log(req.body);
    try {
        const user = new Role(req.body);
        const createuser = await user.save();
        res.status(201).send(createuser);
    } catch (error) {
        res.status(400).send(error);
    }

})

//read all data
router.get('/role', async (req, res) => {
    // console.log(req.body);
    try {
        const roledata = await Role.find();
        res.status(201).json({"status":"true", "data":roledata});
    } catch (error) {
        res.status(400).send(error);
    }

})



module.exports=router