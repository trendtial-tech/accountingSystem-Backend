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

  totalMonths: {
    type: Number,
    default: 0,
  },

  haveAppreciation: {
    type: Boolean,
    default: 0,
  },

  monthlyPercentage: {
    type: Number,
    default: 0,
  },

  appreciationPercentage: {
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

module.exports = mongoose.model('Rental', schema);
