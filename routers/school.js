const express = require('express');
const router = new express.Router();
const School = require('../model/school');
const Student = require('../model/student');


//create operation
router.post('/school', async (req, res) => {
    // console.log(req.body);
    try {
        const user = new School(req.body);
        const createuser = await user.save();
        res.status(201).send(createuser);
    } catch (error) {
        res.status(400).send(error);
    }

})

//read all data
router.get('/school', async (req, res) => {
    // console.log(req.body);
    try {
        const schooldata = await School.find();
        res.status(201).send(schooldata);
    } catch (error) {
        res.status(400).send(error);
    }

})

//read particualr data
router.get('/school/student', async (req, res) => {
    // console.log(req.body);
    try {
        const schooldata = await School.aggregate([
            {
                "$lookup": {
                    "from": "students",
                    "localField": "_id",
                    "foreignField": "schoolId",
                    "as": "std_info"
                }
            }
        ]).exec();

        //console.log(schooldata[0]._id);
        //id=schooldata[0]._id;
        //const data = await Student.find({ 'schoolId': schooldata._id });
        //data1=schooldata+data;
        //console.log(data1)


        if (!schooldata) {
            res.send()
        } else {
            res.status(200).json({"data":schooldata});
        }

    } catch (error) {
        res.status(400).send(error);
    }
})



module.exports = router