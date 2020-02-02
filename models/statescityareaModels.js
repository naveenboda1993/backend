const mongoose = require('mongoose');

const arrayModels = {

    states: [
        {
            name: { type: String, default: '' },
        }
    ],
    cities: [
        {
            name: { type: String, default: '' },
            state: { type: String, default: '' },
        }
    ],
    areas: [
        {
            name: { type: String, default: '' },
            city: { type: String, default: '' },
            state: { type: String, default: '' },
        }
    ],
};

const arraysSchema = mongoose.Schema(arrayModels);

module.exports = mongoose.model('statecityarea', arraysSchema);