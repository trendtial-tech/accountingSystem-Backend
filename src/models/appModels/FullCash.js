const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },

  unit: {
    type: mongoose.Types.ObjectId,
    ref: 'Unit',
  },

  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('FullCash', schema);
