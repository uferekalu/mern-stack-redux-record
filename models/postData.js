const mongoose = require('mongoose')

var PostData = mongoose.model('PostData',
{
    name: {
        type: String,
        required: true
    },
    textarea: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    courses: [{
        type: String,
        required: true
    }],
    panel: {
        type: String,
        required: true
    }
}, 'PostDatas')

module.exports = { PostData }