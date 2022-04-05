const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const connectDB = require('../../config/database');
const User = require('./user.model');

const request = supertest(app);

describe('User Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  // Cleans up database between each test
  afterAll(async () => {
    await User.deleteMany();
    // Closes the Mongoose connection
    await mongoose.connection.close();
  });

  test('should create a new user', async () => {
    const res = await request
      .post('/api/users/')
      .send({
        email: 'k+test@test.com',
        lastName: 'test',
        firstName: 'test',
        password: '1234',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  test('should not create a same user', async () => {
    const res = await request
      .post('/api/users/')
      .send({
        email: 'k+test@test.com',
        lastName: 'test',
        firstName: 'test',
        password: '1234',
      });

    expect(res.statusCode).toEqual(500);
  });
});
