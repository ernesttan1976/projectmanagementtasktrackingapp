const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

// shortcut var to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

module.exports=db;

//Connect to the database before listening
// connectDB().then(() => {
//   app.listen(PORT, () => {
//       console.log("listening for requests");
//   })
// })