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
  deleteCard,
  deleteFile,
};

function editList(req, res, next){
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  Board.findById(boardId)
    .then(board => {
      res.locals={
        list: board.lists.id(listId),
        title: board.title,
        boardId,
        listId,
        list,
        board,
        user: res.locals.user,
      }
      res.render('boards/editlist', res.locals);
    })
    .catch(err => {
      console.log(err);
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

function deleteFile(req, res) {
  const boardId = req.params.boardId;
  const listId = req.params.listId;
  const cardId = req.params.cardId;
  const fileIndex = req.params.fileIndex;
  Board.findById(boardId)
    .then(board=>{
      const list = board.lists.id(listId);
      const card = list.cards.id(cardId);
          card.files.splice(fileIndex,1);
          board.save();
          res.redirect(`/boards/${boardId}/lists/${listId}/cards/${cardId}/edit`);
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
      res.locals={
        title: board.title,
        boardId,
        listId,
        board,
        user: res.locals.user,
      }
      res.render('boards/newcard', res.locals);
    })
    .catch(err => {
      console.log(err);
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
          console.log(err);
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
          console.log(err);
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
      console.log(err);
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
      res.locals={
        title: board.title,
        boardId,
        listId,
        board,
        cardId,
        card: board.lists.id(listId).cards.id(cardId),
        user: res.locals.user,
      }
      
      res.render('boards/editcard', res.locals);
    })
    .catch(err => {
      console.log(err);
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
    })

}

function newList(req, res) {
  const boardId = req.params.boardId;

  Board.findById(boardId).populate('lists').populate('lists.cards')
    .then(board => {
      res.locals={
        title: board.title,
        boardId,
        board,
        user: res.locals.user,
      }
      res.render('boards/newlist', res.locals);
    })
    .catch(err => {
      console.log(err);
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
      console.log(err);
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
      res.locals={
        title: board.title,
        board,
        user: res.locals.user,
      }
      res.render('boards/show', res.locals);
    })
    .catch(err=>{
      console.log(err);
    })

}

function editBoard(req,res,next){
  const boardId = req.params.boardId;
  Board.findById(boardId)
    .then(board=>{
      res.locals={
        title: "Edit Board",
        board,
        user: res.locals.user,
      }
      res.render('boards/editboard', res.locals);
    })
    .catch(err=>{
      console.log(err);
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
  res.locals ={
    title: "New Board",
    user: res.locals.user,
  }
  res.render('boards/new', res.locals);
}


function index(req, res) {
  Board.find()
    .then(boards => {
      if (boards.length === 0) {
        res.redirect('/boards/new');
      } else {
        res.locals ={
          title: "Select Board",
          boards,
          user: res.locals.user,
        }
        res.render('boards/index', res.locals);
      }
    })
    .catch(err => {
      console.log(err);
    })

}
