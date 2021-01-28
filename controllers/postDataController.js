const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId;

var { PostData } = require('../models/postData')

router.get('/', (req, res) => {
    PostData.find((err, docs) => {
        if(!err) res.send(docs)
        else console.log('error while retrieving all data : '+JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {

    PostData.findOne({ name: req.body.name }).then(user => {
        if(user) {
            return res.status(400).json({ name: "Name already exists" });
        } else {
            var newData = new PostData({
                name: req.body.name,
                textarea: req.body.textarea,
                dept: req.body.dept,
                courses: req.body.courses,
                panel: req.body.panel
            });

            newData.save((err, doc) => {
                if(!err) res.send(doc)
                else console.log('Error while creating new record : '+JSON.stringify(err, undefined, 2))
            })
        }
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)
    
    var updatedRecord = {
        name: req.body.name,
        textarea: req.body.textarea,
        dept: req.body.dept,
        courses: req.body.courses,
        panel: req.body.panel
    }

    PostData.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, {new: true}, (err, doc) => {
        if(!err) res.send(doc)
        else console.log('Error while updating a record : '+JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)
    
    PostData.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc)
        else console.log('Error while deleting a record : '+JSON.stringify(err, undefined, 2))
    })
})

module.exports = router