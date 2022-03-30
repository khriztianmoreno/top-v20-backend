const supertest = require('supertest');

const app = require('../../app');

const request = supertest(app);

describe('healthcheck Endpoints', () => {
  test('should display a healthy message', async () => {
    const res = await request.get('/api/healthcheck/');

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Server runnig!!!');
  });
});
