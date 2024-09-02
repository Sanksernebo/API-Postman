const request = require('supertest');
const express = require('express');

// Run tests first with npx jest
// Later run with npx jest --coverage

// Import the Express app
const app = require('./app'); // Make sure this path matches your app file

describe('Students API', () => {
  // Test the GET /students endpoint
  describe('GET /students', () => {
    it('should return a list of students', async () => {
      const response = await request(app).get('/students');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // Test the GET /students/:id endpoint
  describe('GET /students/:id', () => {
    it('should return a single student by ID', async () => {
      const response = await request(app).get('/students/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 if student not found', async () => {
      const response = await request(app).get('/students/999');
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Student not found');
    });
  });

  // Test the POST /students endpoint
  describe('POST /students', () => {
    it('should create a new student', async () => {
      const newStudent = { name: 'David', age: 21, major: 'Biology' };
      const response = await request(app).post('/students').send(newStudent);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newStudent.name);
      expect(response.body).toHaveProperty('age', newStudent.age);
      expect(response.body).toHaveProperty('major', newStudent.major);
    });

    it('should return 400 if invalid data is provided', async () => {
      const invalidStudent = { name: '', age: 21 };
      const response = await request(app).post('/students').send(invalidStudent);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid data');
    });
  });

  // Test the PUT /students/:id endpoint
  describe('PUT /students/:id', () => {
    it('should update a student', async () => {
      const updatedStudent = { name: 'Alice Updated', age: 23 };
      const response = await request(app).put('/students/1').send(updatedStudent);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Alice Updated');
      expect(response.body).toHaveProperty('age', 23);
    });

    it('should return 404 if student to update is not found', async () => {
      const updatedStudent = { name: 'Nonexistent Student', age: 30 };
      const response = await request(app).put('/students/999').send(updatedStudent);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Student not found');
    });
  });

  // Test the DELETE /students/:id endpoint
  describe('DELETE /students/:id', () => {
    it('should delete a student', async () => {
      const response = await request(app).delete('/students/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Student deleted');
    });

    it('should return 404 if student to delete is not found', async () => {
      const response = await request(app).delete('/students/999');
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Student not found');
    });
  });
});
