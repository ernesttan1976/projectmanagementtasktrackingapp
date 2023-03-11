const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const moment = require('moment');
const User = require('./users');

const labelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },  
});

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  labels: [labelSchema],
  users: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
});

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
});

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lists: [listSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);
