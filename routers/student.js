const express = require('express');
const router= new express.Router();
const Student = require('../model/student');




//create operation
router.post('/student', async (req, res) => {
    // console.log(req.body);
    try {
        const user = new Student(req.body);
        const createuser = await user.save();
        res.status(201).send(createuser);
    } catch (error) {
        res.status(400).send(error);
    }

})

//read all data
router.get('/student', async (req, res) => {
    // console.log(req.body);
    try {
        const studentsdata = await Student.find();
        res.status(201).send(studentsdata);
    } catch (error) {
        res.status(400).send(error);
    }

})

//read particualr data
router.get('/student/:id', async (req, res) => {
    // console.log(req.body);
    try {
        const _id = req.params.id;
        const studentdata = await Student.findById({ '_id': _id });
        if (!studentdata) {
            res.send()
        } else {
            res.status(200).send(studentdata);
        }

    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports=router