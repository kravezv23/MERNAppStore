const {Schema, model} = require('mongoose');

const schema = new Schema({
    id_store: { type: String, required: true},
    received: { type: Number, default: 0},
    sold: { type: Number, default: 0},
    storage: { type: Number, default: 0},
    time: { type: Date, default: 0 }
    },
{
    timestamps: true
});

module.exports = model('Stores_turnover', schema);