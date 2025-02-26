const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  unit: {
    type: mongoose.Types.ObjectId,
    ref: 'Unit',
  },

  downPaymentPercent: {
    type: Number,
    default: 0,
  },

  totalMonths: {
    type: Number,
    default: 0,
  },

  reminderDate: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model('Installment', schema);
