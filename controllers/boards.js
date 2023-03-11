const Board = require('../models/boards');

module.exports = {
  show,
};

function show(req, res) {
   res.render('boards/show');
}
