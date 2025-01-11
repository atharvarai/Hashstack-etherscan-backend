const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    number: { type: String, required: true },
    hash: { type: String, required: true },
    transactions: { type: Array, required: true },
});

const Block = mongoose.model('Block', blockSchema);

module.exports = { Block };
