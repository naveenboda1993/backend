const mongoose = require('mongoose');

const trainerModel = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    surname: { type: String, default: '' },
    name: { type: String, default: '' },
    dob: { type: String, default: '' },
    certification: { type: String, default: '' },
    specialization: { type: String, default: '' },
    tagline: { type: String, default: '' },    
    experience: { type: String, default: '' },    
    languages: { type: String, default: '' },    
    age: { type: String, default: '' },    
    // address: { type: String, default: '' },    
    flatno: { type: String, default: '' },    
    street: { type: String, default: '' },    
    area: { type: String, default: '' },    
    locality: { type: String, default: '' },    
    city: { type: String, default: '' },    
    pincode: { type: String, default: '' },    
    state: { type: String, default: '' },    
    id: { type: String, default: '' },    
    accountnumber: { type: String, default: '' },    
    bankname: { type: String, default: '' },    
    ifsccode: { type: String, default: '' },    
    holdername: { type: String, default: '' },    
    images: [
        {
            imgId: { type: String, default: '' },
            imgVersion: { type: String, default: '' }
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
const trainerSchema = mongoose.Schema(trainerModel);


module.exports = mongoose.model('Trainer', trainerSchema);