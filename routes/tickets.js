var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');


//Create-Ticket
router.post('/:flightId', ticketsCtrl.createTicket);
//Update-Ticket
router.put('/:ticketId/flights/:flightId', ticketsCtrl.update);
//Delete-Ticket
router.delete('/:ticketId/flights/:flightId', ticketsCtrl.deleteTicket);

module.exports = router;
