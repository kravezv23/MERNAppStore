const {Schema, model} = require('mongoose');

const schema = new Schema({
    id_store: { type: Number, required: true},
    admission: { type: Number, default: 0},
    sold: { type: Number, default: 0},
    storage: { type: Number, default: 0},
    },
{
    timestamps: true
});

module.exports = model('Stores_turnover', schema);