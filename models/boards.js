const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const moment = require('moment');
const User = require('./users');

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
});

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  labels: [cardSchema],
  users: [userSchema],
});

const labelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },  
});

const boardSchema = new Schema({
  title: {
    type: String,
    default: "Project Plan",
    required: true,
  },
  lists: [listSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);
