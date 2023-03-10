//Generic CRUD Router
//Credit to https://medium.com/@bvodola/crud-routes-generator-with-node-express-js-mongoose-30a16538e16a

const express = require('express');

const crudCtrl = require('../controllers/crud');


  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post('/', crudCtrl.create);
  router.get('/', crudCtrl.readMany);
  router.get('/:_id', crudCtrl.readOne);
  router.put('/:_id', crudCtrl.update);
  router.delete('/:_id', crudCtrl.remove);

  return router;
