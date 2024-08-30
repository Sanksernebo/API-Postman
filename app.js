const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data store
let students = [
  { id: 1, name: "Alice", age: 22, major: "Computer Science" },
  { id: 2, name: "Bob", age: 24, major: "Mathematics" },
  { id: 3, name: "Charlie", age: 23, major: "Physics" }
];

// GET /students - Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET /students/:id - Get a student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// POST /students - Create a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.age || !newStudent.major) {
    return res.status(400).json({ error: "Invalid data" });
  }

  newStudent.id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - Update a student's details
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const updatedData = req.body;
  Object.assign(student, updatedData);
  res.json(student);
});

// DELETE /students/:id - Delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(studentIndex, 1);
  res.json({ message: "Student deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
