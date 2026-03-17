const request = require('supertest');
const app = require('../server');
const { connect, clearDatabase, disconnect } = require('./testHelper');

// Reusable test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
};

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await disconnect());

// ─── Register ────────────────────────────────────────────────────────────────

describe('POST /api/auth/register', () => {
  it('should register a new user and return a token', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toMatchObject({ name: testUser.name, email: testUser.email });
    // Security: password must never appear in the response
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject registration with a duplicate email', async () => {
    // Register once
    await request(app).post('/api/auth/register').send(testUser);
    // Register again with same email
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email already in use/i);
  });

  it('should reject registration with invalid fields', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: '',
      email: 'not-an-email',
      password: '123', // too short
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});

// ─── Login ───────────────────────────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Seed a registered user before each login test
    await request(app).post('/api/auth/register').send(testUser);
  });

  it('should login with correct credentials and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testUser.email);
    // Security: password must never appear in the response
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });

  it('should reject login with unregistered email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'password123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });
});

// ─── Protected Route /me ─────────────────────────────────────────────────────

describe('GET /api/auth/me', () => {
  let token;

  beforeEach(async () => {
    // Register and capture the token
    const res = await request(app).post('/api/auth/register').send(testUser);
    token = res.body.token;
  });

  it('should return the current user when a valid token is provided', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testUser.email);
    // Security: password must never appear in the response
    expect(res.body).not.toHaveProperty('password');
  });

  it('should return 401 when no token is provided', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.statusCode).toBe(401);
  });

  it('should return 401 when an invalid token is provided', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalidtoken123');

    expect(res.statusCode).toBe(401);
  });
});
