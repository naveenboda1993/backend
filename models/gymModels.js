const mongoose = require('mongoose');
const serviceModels = require('../models/serviceModels');

const gymmodel = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gymname: { type: String },
    ownername: { type: String },
    gymdec: { type: String, default: '' },
    gymtag: { type: String, default: '' },
    services: [{
        name: { type: String, default: '' },
        servicedec: { type: String, default: '' },
        servicecode: { type: String, default: '' },
        status: { type: String, default: '' },


        images: [
            {
                imgId: { type: String, default: '' },
                imgVersion: { type: String, default: '' }
            }
        ],
    }],
    gymcategory: { type: String },
    flatno: { type: String },
    street: { type: String },
    area: { type: String },
    locality: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    email: { type: String },
    accountnumber: { type: String },
    bankname: { type: String },
    ifsccode: { type: String },
    holdername: { type: String },
    gst: { type: String },
    timings: { type: String },
    phonenumber: { type: Number },
    officenumber: { type: Number },
    picVersion: { type: String, default: '1578562408' },
    picId: { type: String, default: 'gym-default-image.jpg' },
    images: [
        {
            imgId: { type: String, default: '' },
            imgVersion: { type: String, default: '' },
            status: { type: String, default: 'visible' }
        }
    ],
    workinghours: [{
        day: { type: String },
        duration: { type: String },
        multiplebookings: { type: String },
        numberofbookings: { type: String },
        status: { type: String },
        slots: [
            {
                id: { type: String },
                starting: { type: String },
                ending: { type: String },
            }
        ],
    }]
}

const gymSchema = mongoose.Schema(gymmodel);

module.exports = mongoose.model('Gym', gymSchema);
