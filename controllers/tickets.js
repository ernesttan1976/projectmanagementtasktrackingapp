const Ticket = require('../models/tickets');

module.exports = {
  createTicket,
  update,
  deleteTicket,
};

function deleteTicket(req,res){
  const ticketId = req.params.ticketId;
  const flightId = req.params.flightId;
  Ticket.findByIdAndDelete(ticketId)
  .then(result=>{
    res.redirect(`/flights/${flightId}`);
  })
  .catch(err=>{
    console.log(err);
    res.redirect(`/flights/${flightId}`);  
  })
}


function update(req,res){
  const flightId = req.params.flightId;
  const ticketId = req.params.ticketId;
  const {seat,price} = req.body;
  const ticket = {seat, price, flightId}; 

  Ticket.findByIdAndUpdate(ticketId,ticket)
  .then(result=>{
    res.redirect(`/flights/${flightId}`);
  })
  .catch(err=>{
    console.log(err);
    res.redirect(`/flights/${flightId}`);  
  })
}

function createTicket(req,res){

    const flightId = req.params.flightId;
    const {seat, price} = req.body;
    const ticket = {
      seat,
      price,
      flight: flightId,
    }
  console.log(ticket);
  Ticket.create(ticket)
    .then(result=>{
      console.log('ticket created: ',result);
      res.redirect(`/flights/${flightId}`);
    })
    .catch(err=>{
      console.log(err);
      res.redirect(`/flights/${flightId}`);
    })

}