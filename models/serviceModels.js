const mongoose = require('mongoose');

const serviceModels ={
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
};

const serviceSchema = mongoose.Schema(serviceModels);

module.exports = mongoose.model('service', serviceSchema);