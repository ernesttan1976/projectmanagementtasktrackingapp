var express = require('express');
var router = express.Router();
const upload = require('../common');
var {uploadFile, getFileStream} = require('../s3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const Board = require('../models/boards');

router.get('/images/:key',(req,res)=>{
    const key = req.params.key;
    console.log(req.params.key);
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

router.post("/single/b/:boardId/l/:listId/c/:cardId", upload.single("file"), async (req, res) => {
  //upload.single(<name='file' of HTML form field>)
  console.log(req.file);
    // uploading to AWS S3*
    const result = await uploadFile(req.file);  // Calling above function in s3.js  
    console.log("S3 response", result);  
    // You may apply filter, resize image before sending to client*
    // Deleting from local if uploaded in S3 bucket*
    await unlinkFile(req.file.path);
    //use fetch to include boardID, listID and cardID im req.body
    //get card object and add the file to it
    console.log('result.key:',result.key);
    const boardId = req.params.boardId;
    const listId = req.params.listId;
    const cardId = req.params.cardId;
    Board.findById(boardId)
    .then(board=>{
      board.lists.id(listId).cards.id(cardId).files.push(encodeURI(result.key));
      board.lists.id(listId).cards.id(cardId).title+=`\n![](/upload/images/${encodeURI(result.key)})`;
              board.save();
              console.log({
                status: "success",
                message: "File uploaded successfully",
                data: req.file,
                });
              res.redirect(`/boards/${boardId}/lists/${listId}/cards/${cardId}/edit`);    
            })
        })

  router.post("/multiple",upload.array('images'), (req,res)=>{
    console.log(req.files);
    res.send({
        status: "success",
        message: "Files upload successfully",
        data: req.files,
    })
  })
  
  module.exports = router;