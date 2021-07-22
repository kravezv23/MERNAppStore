const {Schema, model} = require('mongoose');

const schema = new Schema({
    producted: { type: Number, default: 0},
    sent: { type: Number, default: 0},
    remainder: { type: Number, default: 0},
    },
{
    timestamps: true
});

module.exports = model('Bekary', schema);