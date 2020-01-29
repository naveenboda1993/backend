const mongoose = require('mongoose');

const pricingModel = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },

    isvip: { type: String, default: 'yes' },
    isbudget: { type: String, default: 'no' },
    ispremium: { type: String, default: 'yes' },
    onemonth: { type: String, default: '500' },
    twomonth: { type: String, default: '1000' },
    threemonth: { type: String, default: '3000' },
    sixmonth: { type: String, default: '6000' },
    twelevemonth: { type: String, default: '12000' },
    twofourmonth: { type: String, default: '24000' },
    servicesprices: [{
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        servicename: { type: String, default: '' },
        indiviual: {
            onemonth: { type: String, default: '100' },
            twomonth: { type: String, default: '200' },
            threemonth: { type: String, default: '300' },
            sixmonth: { type: String, default: '600' },
            twelvemonth: { type: String, default: '1000' }
        },
        withpackage: {
            onemonth: { type: String, default: '100' },
            twomonth: { type: String, default: '200' },
            threemonth: { type: String, default: '300' },
            sixmonth: { type: String, default: '600' },
            twelvemonth: { type: String, default: '1000' }
        }
    }],

}
const pricingSchema = mongoose.Schema(pricingModel);


module.exports = mongoose.model('Pricing', pricingSchema);