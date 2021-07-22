const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, unique: true},
    min: { type: Number, default: 0},
    max: { type: Number, default: 0},
    },
{
    timestamps: true
});

module.exports = model('Options', schema);