const Flight = require('../models/flights');
const Ticket = require('../models/tickets');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
  createDestination,
  deleteDestination,
};

async function index(req, res) {
  const flights = await Flight.find().sort({departs:1});
    res.render('flights/index', { title: 'All Flights', flights });
}

function show(req, res) {
  Flight.findById(req.params.id).sort('destinations.arrival').exec((err, flight)=>{
    Ticket.find({flight: flight._id}, function(err, tickets) {
      // Now you can pass both the flight and tickets in the res.render call
      res.render('flights/show', { title: 'Flight Detail', flight, tickets });
    });
    
  });

}

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;

  res.render('flights/new', { title: 'Add Flight', newFlight, departsDate });
}

function create(req, res) {
  // Delete empty properties on req.body for defaults to happen 
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new');
    console.log(flight);
    res.redirect('/flights');
  });
}

async function createDestination(req,res){
  const id = req.params.id;
  const destination = req.body;
  const flight = await Flight.findById(id);
  flight.destinations.push(destination);
  await flight.save();
  res.redirect(`/flights/${id}`);
  
}

async function deleteDestination(req,res){
  const id = req.params.id;
  const destinationId = req.params.destid;

  const flight = await Flight.findById(id);
  await flight.destinations.id(destinationId).remove();
  flight.save((err)=>{
    res.redirect(`/flights/${id}`);
  });
}
