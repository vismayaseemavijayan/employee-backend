// const express = require('express');
// const Employee = require('../models/Employee');
// const Position = require('../models/Position');

// const router = express.Router();
// router.post('/', async (req, res) => {
//   try {
//     const { name, positionId, salary } = req.body;
//     //console.log("pppppppppp");
    
//     //console.log(positionId);
    
//     const newEmployee = new Employee({ name, position: positionId, salary });
//     await newEmployee.save();
//     res.status(201).json(newEmployee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// // router.get('/', async (req, res) => {

// //   const { page = 1, limit = 5, search = '', filter = '' } = req.query;
  
// //   // const filterQuery = filter ? { position: filter } : {};
// //   const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

// //   try {
// //     const employees = await Employee.find({ ...searchQuery }).populate('position')
// //       .skip((page - 1) * limit)
// //       .limit(parseInt(limit));
      
      
// //       const totalEmployees = await Employee.countDocuments({ ...searchQuery, ...filterQuery });
    
// //       res.json({
// //         employees,
// //         totalPages: Math.ceil(totalEmployees / limit),
// //         currentPage: page,
// //       });
// //     } catch (err) {
// //       res.status(400).json({ message: err.message });
// //     }
// //   });

// router.get('/', async (req, res) => {
//   const { page = 1, limit = 5, search = '', filter = '' } = req.query;
//   console.log("Inside employee list controler");
  
//   const matchStage = {};

//   // Add search filter to match stage
//   if (search) {
//     matchStage.name = { $regex: search, $options: 'i' }; // Case-insensitive search
//   }

//   // Add position filter to match stage if provided
//   if (filter) {
//     const position = await Position.findOne({ title: filter });
//     if (position) {
//       matchStage.position = position._id; // Filter by position ID
//     } else {
//       return res.json({
//         employees: [],
//         totalPages: 0,
//         currentPage: Number(page),
//       });
//     }
//   }

//   try {
//     const employees = await Employee.aggregate([
//       { $match: matchStage }, // Match the search and filter criteria
//       {
//         $lookup: {
//           from: 'positions', // Collection name of the positions
//           localField: 'position', // Field in Employee referencing Position
//           foreignField: '_id', // Field in Position being referenced
//           as: 'position', // Output array field in results
//         },
//       },
//       { $unwind: '$position' }, // Unwind the array to include only objects
//       { $skip: (page - 1) * limit },
//       { $limit: parseInt(limit) },
//     ]);

//     const totalEmployees = await Employee.countDocuments(matchStage);

//     res.json({
//       employees,
//       totalPages: Math.ceil(totalEmployees / limit),
//       currentPage: Number(page),
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });






// // router.get('/', async (req, res) => {
// //   const { page = 1, limit = 5, search = '', filter = '' } = req.query;

// //   try {
// //     // Construct search and filter queries
// //     const filterQuery = filter ? { position: filter } : {}; // Filter by position ID
// //     const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {}; // Search by name

// //     // Fetch employees with populated position data
// //     const employees = await Employee.find({ ...searchQuery, ...filterQuery })
// //       .populate('position', 'title') // Populate the 'position' field, selecting only the 'title'
// //       .skip((page - 1) * limit)
// //       .limit(parseInt(limit));

// //     // Get the total count of matching employees
// //     const totalEmployees = await Employee.countDocuments({ ...searchQuery, ...filterQuery });

// //     // Respond with the employees and pagination info
// //     res.json({
// //       employees,
// //       totalPages: Math.ceil(totalEmployees / limit),
// //       currentPage: page,
// //     });
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });












  
//   // Update an employee by ID
//   router.put('/:id', async (req, res) => {
//     try {
//       const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!employee) return res.status(404).json({ message: 'Employee not found' });
//       res.json(employee);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Delete an employee by ID
//   router.delete('/:id', async (req, res) => {
//     try {
//       const employee = await Employee.findByIdAndDelete(req.params.id);
//       if (!employee) return res.status(404).json({ message: 'Employee not found' });
//       res.json({ message: 'Employee deleted successfully' });
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   module.exports = router;








// const express = require('express');
// const Employee = require('../models/Employee');
// const Position = require('../models/Position');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { name, positionId, salary } = req.body;
//     const newEmployee = new Employee({ name, position: positionId, salary });
//     await newEmployee.save();
//     res.status(201).json(newEmployee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   const { page = 1, limit = 5, search = '', filter = '' } = req.query;
//   console.log("Inside employee list controller");
  
//   const matchStage = {};

//   // Add search filter to match stage
//   if (search) {
//     matchStage.name = { $regex: search, $options: 'i' }; // Case-insensitive search
//   }

//   // Add position filter to match stage if provided
//   if (filter) {
//     const position = await Position.findOne({ title: filter });
//     if (position) {
//       matchStage.position = position._id; // Filter by position ID
//     } else {
//       return res.json({
//         employees: [],
//         totalPages: 0,
//         currentPage: Number(page),
//       });
//     }
//   }

//   try {
//     // First, get the total count of employees
//     const totalEmployees = await Employee.countDocuments(matchStage);
    
//     // Calculate total pages
//     const totalPages = Math.ceil(totalEmployees / limit);

//     // Skip the empty pages in the calculation of pagination
//     if (page > totalPages) {
//       return res.json({
//         employees: [],
//         totalPages: totalPages,
//         currentPage: Number(page),
//       });
//     }

//     // Retrieve employees for the current page
//     const employees = await Employee.aggregate([
//       { $match: matchStage }, // Match the search and filter criteria
//       {
//         $lookup: {
//           from: 'positions', // Collection name of the positions
//           localField: 'position', // Field in Employee referencing Position
//           foreignField: '_id', // Field in Position being referenced
//           as: 'position', // Output array field in results
//         },
//       },
//       { $unwind: '$position' }, // Unwind the array to include only objects
//       { $skip: (page - 1) * limit }, // Skip records for pagination
//       { $limit: parseInt(limit) }, // Limit number of records based on `limit`
//     ]);

//     // Return the response with employees and pagination data
//     res.json({
//       employees,
//       totalPages: totalPages, // Only return pages with actual content
//       currentPage: Number(page),
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update an employee by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!employee) return res.status(404).json({ message: 'Employee not found' });
//     res.json(employee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete an employee by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) return res.status(404).json({ message: 'Employee not found' });
//     res.json({ message: 'Employee deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;


//hello friday
// const express = require('express');
// const Employee = require('../models/Employee');
// const Position = require('../models/Position');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { name, positionId, salary } = req.body;
//     const newEmployee = new Employee({ name, position: positionId, salary });
//     await newEmployee.save();
//     res.status(201).json(newEmployee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   let { page = 1, limit = 5, search = '', filter = '' } = req.query;
  
//   // Ensure `page` and `limit` are numbers
//   page = parseInt(page, 10);
//   limit = parseInt(limit, 10);

//   console.log("Inside employee list controller");

//   const matchStage = {};

//   // Add search filter to match stage
//   if (search) {
//     matchStage.name = { $regex: search, $options: 'i' }; // Case-insensitive search
//   }

//   // Add position filter to match stage if provided
//   if (filter) {
//     const position = await Position.findOne({ title: filter });
//     if (position) {
//       matchStage.position = position._id; // Filter by position ID
//     } else {
//       return res.json({
//         employees: [],
//         totalPages: 0,
//         currentPage: page,
//       });
//     }
//   }

//   try {
//     // First, get the total count of employees matching the filters
//     const totalEmployees = await Employee.countDocuments(matchStage);
    
//     // Calculate total pages based on total count and limit
//     const totalPages = Math.ceil(totalEmployees / limit);

//     // If requested page is greater than total pages, return empty results
//     if (page > totalPages) {
//       return res.json({
//         employees: [],
//         totalPages,
//         currentPage: page,
//       });
//     }

//     // Retrieve employees for the current page
//     const employees = await Employee.aggregate([
//       { $match: matchStage }, // Match the search and filter criteria
//       {
//         $lookup: {
//           from: 'positions', // Collection name of the positions
//           localField: 'position', // Field in Employee referencing Position
//           foreignField: '_id', // Field in Position being referenced
//           as: 'position', // Output array field in results
//         },
//       },
//       { $unwind: '$position' }, // Unwind the array to include only objects
//       { $skip: (page - 1) * limit }, // Skip records for pagination
//       { $limit: limit }, // Limit number of records based on `limit`
//     ]);

//     // Return the response with employees and pagination data
//     res.json({
//       employees,
//       totalPages, // Total number of pages
//       currentPage: page, // Current page
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update an employee by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!employee) return res.status(404).json({ message: 'Employee not found' });
//     res.json(employee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete an employee by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) return res.status(404).json({ message: 'Employee not found' });
//     res.json({ message: 'Employee deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;




const express = require('express');
const Employee = require('../models/Employee');
const Position = require('../models/Position');

const router = express.Router();

// Add Employee
router.post('/', async (req, res) => {
  try {
    const { name, positionId, salary } = req.body;
    const newEmployee = new Employee({ name, position: positionId, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Employees with Pagination, Search, and Filter
router.get('/', async (req, res) => {
  let { page = 1, limit = 5, search = '', filter = '' } = req.query;

  // Ensure `page` and `limit` are numbers
  page = Math.max(parseInt(page, 10), 1);
  limit = Math.max(parseInt(limit, 10), 1);

  const matchStage = {};

  // Add search filter to match stage
  if (search) {
    matchStage.name = { $regex: search, $options: 'i' }; // Case-insensitive search
  }

  // Add position filter to match stage if provided
  if (filter) {
    const position = await Position.findOne({ title: filter });
    if (position) {
      matchStage.position = position._id; // Filter by position ID
    } else {
      // If the filter position does not exist, return no results
      return res.json({
        employees: [],
        totalPages: 0,
        currentPage: 0,
      });
    }
  }

  try {
    // Get total number of matching employees
    const totalEmployees = await Employee.countDocuments(matchStage);

    // Calculate total pages
    const totalPages = Math.ceil(totalEmployees / limit);

    // If page exceeds totalPages, cap it to totalPages
    if (page > totalPages) page = totalPages;

    // Retrieve employees for the current page
    const employees = await Employee.aggregate([
      { $match: matchStage }, // Apply search and filter criteria
      {
        $lookup: {
          from: 'positions', // Collection name of positions
          localField: 'position', // Field in Employee referencing Position
          foreignField: '_id', // Field in Position being referenced
          as: 'position', // Output array field in results
        },
      },
      { $unwind: '$position' }, // Flatten position array to objects
      { $skip: (page - 1) * limit }, // Skip records for pagination
      { $limit: limit }, // Limit number of records to `limit`
    ]);

    // If totalPages is 0, reset the page to 0
    const currentPage = totalPages === 0 ? 0 : page;

    // Return the employees and pagination info
    res.json({
      employees,
      totalPages,
      currentPage,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an Employee by ID
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an Employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;



//monday code
