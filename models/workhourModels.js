const mongoose = require('mongoose');

const workhourSchema= mongoose.Schema({
    gym: {type: mongoose.Schema.Types.ObjectId, ref: 'Gym'},
    gymowner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sunday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    monday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    tuesday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    wednesday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    thursday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    friday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    saturday: [
        {
            time: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ],
    holidays: [
        {
            date: {type: String, default: ''},
            createdAt: {type: String, default: Date.now()}
        }
    ]
});


module.exports = mongoose.model('workhour', workhourSchema);