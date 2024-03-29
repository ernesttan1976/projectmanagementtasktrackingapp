const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;
const User = require('./users');
const dayjs = require('dayjs');

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  labels: [String],
  files: [String],
  users: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  }],
});

cardSchema.virtual('dueDateShort').get(function(){
  return dayjs(this.dueDate).format('DD-MM-YYYY');
});

cardSchema.virtual('dueDateHTMLTag').get(function(){
  return (this.dueDate)?dayjs(this.dueDate).format('YYYY-MM-DD'):dayjs().format('YYYY-MM-DD');
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
