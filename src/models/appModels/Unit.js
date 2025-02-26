const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  project: {
    type: String,
  },

  unitNo: {
    type: String,
  },

  floor: {
    type: String,
  },

  totalPrice: {
    type: Number,
    default: 0,
  },

  hash: {
    type: String,
    unique: true,
    default: '',
    required: true,
  },

  type: {
    type: String,
  },

  pricePerSqFeet: {
    type: Number,
    default: 0,
  },

  sizePerSqFeet: {
    type: Number,
    default: 0,
  },

  downPayment: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
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

module.exports = mongoose.model('Unit', schema);
