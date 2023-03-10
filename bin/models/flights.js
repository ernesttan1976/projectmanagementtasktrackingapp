const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const yearsToAdd = 1;
const monthsToAdd = 0;
const daysToAdd = 0;

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['Singapore AirLines','Scoot','Tiger Airways','Silkair','Cathay Pacific','Quantas'],
    default: 'Singapore AirLines',
    required: true,
  },
  airport: {
    type: String,
    enum: ['PVG','ICN','HKG','NRT','PEK','SIN','HND','BKK','DEL','CAN','BOM','MNL','CGK','KUL','KIX'],
    default: 'SIN',
    required: true
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  },
  departs: {
    type: Date,
    default: new Date(new Date().getTime() + yearsToAdd * 365 * 24 * 60 * 60 * 1000 + monthsToAdd * 30 * 24 * 60 * 60 * 1000 + daysToAdd * 24 * 60 * 60 * 1000)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);