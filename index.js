const express = require('express');
const app = express();
const PORT = 8080;

// Middleware to parse JSON request bodies
app.use(express.json());
// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// In-memory array to store student data
let studentsArray = [
    { 
        id: "1",
        name: "Theshani Senavirathna",
        university: "University of Rajarata"
    },
    { 
        id: "2",
        name: "Saman Perera",
        university: "University of Colombo"
    }
];

// Utility function to generate a new unique ID
const generateId = () => {
    return (studentsArray.length + 1).toString();
};

// GET endpoint to retrieve all students
app.get('/students', (req, res) => {
    res.status(200).json({ message: 'Students retrieved successfully', data: studentsArray });
});

// GET endpoint to retrieve a specific student by ID
app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = studentsArray.find(student => student.id === id);
    if (!student) {
        return res.status(404).json({ message: `Student with ID ${id} not found` });
    }
    res.status(200).json({ message: 'Student retrieved successfully', data: student });
});

// POST endpoint to add a new student
app.post('/students', (req, res) => {
    const { name, university } = req.body;

    if (!name || !university) {
        return res.status(400).json({ message: 'Name and university are required!' });
    }

    // Generate a new ID
    const newId = generateId();
    const newStudent = { id: newId, name, university };
    studentsArray.push(newStudent);
    res.status(201).json({ message: 'Student added successfully', data: newStudent });
});

// PATCH endpoint to update a student's information by ID
app.patch('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, university } = req.body;

    const studentIndex = studentsArray.findIndex(student => student.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({ message: `Student with ID ${id} not found` });
    }

    if (name) studentsArray[studentIndex].name = name;
    if (university) studentsArray[studentIndex].university = university;

    res.status(200).json({ message: 'Student updated successfully', data: studentsArray[studentIndex] });
});

// DELETE endpoint to remove a student by ID
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;

    const studentIndex = studentsArray.findIndex(student => student.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({ message: `Student with ID ${id} not found` });
    }

    studentsArray.splice(studentIndex, 1);
    res.status(200).json({ message: 'Student deleted successfully' });
});



