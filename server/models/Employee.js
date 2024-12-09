//hello
// models/Employee.js
const mongoose = require('mongoose');
// const Position = require('./Position'); // Add reference to Position

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'positions', required: true }, // Reference to Position
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;




///monday code
// const mongoose = require('mongoose');

// const EmployeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
//   salary: { type: Number, required: true },
// });

// module.exports = mongoose.model('Employee', EmployeeSchema);

