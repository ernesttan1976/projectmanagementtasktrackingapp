const Board = require('../models/boards');
const dayjs = require('dayjs');

module.exports = {
  index,
  redirect,
  show,
  newBoard,
  editBoard,
  updateBoard,
  create,
  newList,
  createList,
  editList,
  updateList,
  deleteList,
  newCard,
  createCard,
  editCard,
  updateCard,
  createLabel,
  deleteLabel,
  deleteCard
};

function editList(req, res, next){
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  Board.findById(boardId)
    .then(board => {
      const list = board.lists.id(listId);
      const title = board.title;
      const context = { title, boardId, listId, list, board};
      res.render('boards/editlist', context);
    })
    .catch(err => {
      res.send(next);
    })
}

function updateList(req, res){
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  Board.findById(boardId)
    .then(board => {
      const list = board.lists.id(listId);
      list.title = req.body.title;
      board.save();
      res.redirect(`/boards/${boardId}`);
    })
    .catch(err => {
      res.send(next);
    })
}


function deleteLabel(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  const labelIndex = req.params.labelIndex;
  Board.findById(boardId)
    .then(board=>{
      const list = board.lists.id(listId);
      const card = list.cards.id(cardId);
          card.labels.splice(labelIndex,1);
          board.save();
          res.redirect(`/boards/${boardId}/lists/${listId}/cards/${cardId}/edit`);
        })
}

function createLabel(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  const labelTitle = req.body.labelTitle;
  Board.findById(boardId)
    .then(board=>{
      const list = board.lists.id(listId);
      const card = list.cards.id(cardId);
          card.labels.push(labelTitle);
          board.save();
          res.redirect(`/boards/${boardId}/lists/${listId}/cards/${cardId}/edit`);
        })
}

function newCard(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  Board.findById(boardId)
    .populate('lists')
    .populate('lists.cards')
    .then(board => {
      const title = board.title;
      const context = { title, boardId, listId, board};
      res.render('boards/newcard', context);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
}

function deleteCard(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  Board.findById(boardId)
    .then(board=>{
      const list = board.lists.id(listId);
      const card = list.cards.id(cardId);
          card.remove();
          board.save();
          res.redirect(`/boards/${boardId}`);
        })   
        .catch(err => {
          console.error(err);
          res.send(err);
        })
}


function createCard(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardTitle = req.body.title;
  Board.findById(boardId)
    .then(board=>{
      const list = board.lists.id(listId);
          list.cards.push({title: cardTitle});
          board.save();
          res.redirect(`/boards/${boardId}`);
        })
        .catch(err => {
          console.error(err);
          res.send(err);
        })
}

function updateCard(req,res){
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  const {title, dueDate} = req.body;
  Board.findById(boardId)
    .then(board => {
      const card = board.lists.id(listId).cards.id(cardId);
      card.title = title;
      card.dueDate = dayjs(dueDate, 'YYYY-MM-DD HH:mm:ss').toDate();
      board.save();
      res.redirect(`/boards/${boardId}`);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
}


function editCard(req,res){
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  Board.findById(boardId)
    .populate('lists')
    .populate('lists.cards')
    .populate('lists.cards.users')
    .then(board => {
      const card = board.lists.id(listId).cards.id(cardId);
      const title = board.title;
      const context = { title, boardId, listId, cardId, board, card};
      res.render('boards/editcard', context);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
}

function deleteList(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  Board.findById(boardId)
    .then(async function (board){
      const list = await board.lists.id(listId);
      await list.remove();
      await board.save();
      res.redirect(`/boards/${boardId}`);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })

}

function createList(req, res) {
  const boardId = req.params.boardId;
  const listTitle = req.body.title;
  Board.findById(boardId)
    .then(board => {
      board.lists.push({ title: listTitle });
      board.save();
      res.redirect(`/boards/${boardId}`);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })

}

function newList(req, res) {
  const boardId = req.params.boardId;

  Board.findById(boardId).populate('lists').populate('lists.cards')
    .then(board => {
      const title = board.title;
      const context = { title, boardId, board};
      res.render('boards/newlist', context);
    })
    .catch(err => {
      console.err(err);
      res.send(err);
    })
}

function create(req, res) {
  const newBoard = {
    title: req.body.title,
  }
  Board.create(newBoard)
    .then(board => {
      res.redirect(`/boards/${board._id}`);
    })
    .catch(err => {
      console.err(err);
      res.send(err);
    })
}

function redirect(req, res) {
  console.log("Redirect",req.query.boardId);
  //res.send(`/boards/${req.query.boardId}`);
  res.redirect(`/boards/${req.query.boardId}`);
}

function show(req, res) {
  const boardId = req.params.boardId;
  Board.findById(boardId).populate('lists').sort({ 'lists._id': -1 }).populate('lists.cards')
    .then(board => {
      const title = board.title;
      const context = { title, board};
      console.log(context);
      res.render('boards/show', context);
    })
    .catch(err=>{
      res.status('404').send('error');
    })

}

function editBoard(req,res,next){
  const boardId = req.params.boardId;
  Board.findById(boardId)
    .then(board=>{
      const context = {title: "Edit Board", board};
      res.render('boards/editboard', context);
    })
    .catch(err=>{
      console.log(err);
      res.send(err);
    })
}

function updateBoard(req,res,next){
  const boardId = req.params.boardId;
  Board.findById(boardId)
    .then(board=>{
      board.title = req.body.title;
      board.save();
      res.redirect(`/boards/${boardId}`);
    })
    .catch(err=>{
      console.log(err);
      res.send(err);
    })
}

function newBoard(req, res) {
  res.render('boards/new');
}


function index(req, res) {
  Board.find()
    .then(boards => {
      if (boards.length === 0) {
        res.redirect('/boards/new');
      } else {
        const title = "Select Board";
        const context = { title, boards};
        res.render('boards/index', context);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })

}
