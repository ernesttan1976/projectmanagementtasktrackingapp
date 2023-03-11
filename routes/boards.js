var express = require('express');
var router = express.Router();
var boardsCtrl = require('../controllers/boards');


//READ ALL: GET /boards
router.get('/', boardsCtrl.index);

//NEW: GET /boards/new
router.get('/new', boardsCtrl.newBoard);

//READ ONE: GET /boards/select
router.get('/select', boardsCtrl.redirect);

//READ ONE: GET /boards/:b
router.get('/:boardId', boardsCtrl.show);

//CREATE: POST /boards
router.post('/', boardsCtrl.create);

//NEW: GET /boards/:b/lists/new
router.get('/:boardId/lists/new', boardsCtrl.newList);

//CREATE: POST /boards/:b/lists
router.post('/:boardId/lists', boardsCtrl.createList);

//DELETE: DELETE /boards/:b/lists/:l
router.delete('/:boardId/lists/:listId', boardsCtrl.deleteList);


//NEW: GET /boards/:b/lists/:l/cards/new
router.get('/:boardId/lists/:listId/cards/new', boardsCtrl.newCard);

//CREATE: POST /boards/:b/lists/:l/cards
router.post('/:boardId/lists/:listId/cards', boardsCtrl.createCard);

//EDIT: GET /boards/:b/lists/:l/cards/:c
router.get('/:boardId/lists/:listId/cards/:cardId/edit', boardsCtrl.editCard);

//UPDATE ONE: PUT /board/:b/lists/:l/cards/:c
router.put('/:boardId/lists/:listId/cards/:cardId', boardsCtrl.updateCard);

//DELETE: DELETE /boards/:b/lists/:l/cards/:c
router.delete('/:boardId/lists/:listId/cards/:cardId', boardsCtrl.deleteCard);

//CREATE: POST /boards/:b/lists/:l/cards/:c/labels
router.post('/:boardId/lists/:listId/cards/:cardId/labels', boardsCtrl.createLabel);

//DELETE: DELETE /boards/:b/lists/:l/cards/:c/labels/:l
router.delete('/:boardId/lists/:listId/cards/:cardId/labels/:labelId', boardsCtrl.deleteLabel);

module.exports = router;
