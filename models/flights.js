const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const moment = require('moment');

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['SIN','PVG','ICN','HKG','NRT','PEK','HND','BKK','DEL','CAN','BOM','MNL','CGK','KUL','KIX'],
    default: 'SIN',
    required: true
  },
  arrival: {
    type: Date,
    default: new moment().utc().add(24, 'hours')
  }
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['Singapore AirLines','Scoot','Tiger Airways','Silkair','Cathay Pacific','Qantas'],
    default: 'Qantas',
    required: true,
  },
  airport: {
    type: String,
    enum: ['SIN','PVG','ICN','HKG','NRT','PEK','HND','BKK','DEL','CAN','BOM','MNL','CGK','KUL','KIX'],
    default: 'BKK',
    required: true
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    default: 7777,
    required: true
  },
  departs: {
    type: Date,
    default: new moment().utc().add(24, 'hours'),
  },
  destinations: [destinationSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
