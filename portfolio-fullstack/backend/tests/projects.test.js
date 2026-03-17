const request = require('supertest');
const app = require('../server');
const { connect, clearDatabase, disconnect } = require('./testHelper');

// Reusable test data
const testUser = { name: 'Admin', email: 'admin@example.com', password: 'password123' };
const sampleProject = {
  title: 'My Portfolio',
  description: 'A MERN stack portfolio',
  technologies: ['React', 'Node.js'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/example',
};

let token;

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await disconnect());

// Helper: register a user and return an auth token
const getToken = async () => {
  const res = await request(app).post('/api/auth/register').send(testUser);
  return res.body.token;
};

// ─── GET all projects ─────────────────────────────────────────────────────────

describe('GET /api/projects', () => {
  it('should return an empty array when no projects exist', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return all projects sorted newest first', async () => {
    token = await getToken();
    await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);
    await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...sampleProject, title: 'Second Project' });

    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    // Newest first — Second Project was created last
    expect(res.body[0].title).toBe('Second Project');
  });
});

// ─── GET single project ───────────────────────────────────────────────────────

describe('GET /api/projects/:id', () => {
  it('should return a project by ID', async () => {
    token = await getToken();
    const created = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    const res = await request(app).get(`/api/projects/${created.body._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(sampleProject.title);
  });

  it('should return 404 for a non-existent project', async () => {
    const res = await request(app).get('/api/projects/64a1b2c3d4e5f6a7b8c9d0e1');
    expect(res.statusCode).toBe(404);
  });
});

// ─── POST create project ──────────────────────────────────────────────────────

describe('POST /api/projects', () => {
  it('should create a project when authenticated', async () => {
    token = await getToken();
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(sampleProject.title);
    expect(res.body.technologies).toEqual(sampleProject.technologies);
  });

  it('should return 401 when not authenticated', async () => {
    const res = await request(app).post('/api/projects').send(sampleProject);
    expect(res.statusCode).toBe(401);
  });

  it('should return 400 when title is missing', async () => {
    token = await getToken();
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'No title project' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});

// ─── PUT update project ───────────────────────────────────────────────────────

describe('PUT /api/projects/:id', () => {
  it('should update a project when authenticated', async () => {
    token = await getToken();
    const created = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    const res = await request(app)
      .put(`/api/projects/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    // Other fields should remain unchanged
    expect(res.body.description).toBe(sampleProject.description);
  });

  it('should return 401 when not authenticated', async () => {
    token = await getToken();
    const created = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    const res = await request(app)
      .put(`/api/projects/${created.body._id}`)
      .send({ title: 'Hacked Title' });

    expect(res.statusCode).toBe(401);
  });

  it('should return 404 when updating a non-existent project', async () => {
    token = await getToken();
    const res = await request(app)
      .put('/api/projects/64a1b2c3d4e5f6a7b8c9d0e1')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Ghost Project' });

    expect(res.statusCode).toBe(404);
  });
});

// ─── DELETE project ───────────────────────────────────────────────────────────

describe('DELETE /api/projects/:id', () => {
  it('should delete a project when authenticated', async () => {
    token = await getToken();
    const created = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    const res = await request(app)
      .delete(`/api/projects/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    // Confirm it's actually gone
    const check = await request(app).get(`/api/projects/${created.body._id}`);
    expect(check.statusCode).toBe(404);
  });

  it('should return 401 when not authenticated', async () => {
    token = await getToken();
    const created = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleProject);

    const res = await request(app).delete(`/api/projects/${created.body._id}`);
    expect(res.statusCode).toBe(401);
  });
});
