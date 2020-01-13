const mongoose = require('mongoose');

const serviceModels ={
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    kickboing: { type: String, default: '' },
    aerobics: { type: String, default: '' },
    spinning: { type: String, default: '' },
    workout: { type: String, default: '' },


    images: [
        {
            imgId: { type: String, default: '' },
            imgVersion: { type: String, default: '' }
        }
    ],
};

const serviceSchema = mongoose.Schema(serviceModels);

module.exports = mongoose.model('service', serviceSchema);