models/Position.js
hello
const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

const Position = mongoose.model('positions', positionSchema);

module.exports = Position;


//monday code
// const mongoose = require('mongoose');

// const PositionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
// });

// module.exports = mongoose.model('Position', PositionSchema);

