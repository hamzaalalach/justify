const app = require('../index');
const request = require('supertest');
let client;

beforeAll(() => {
  client = request(app);
});

const email = { email: 'hamzaalalach@gmail.com' };
const toJustify =
  'Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé.';
const expectedJustification =
  'Cette croyance survivait pendant quelques secondes à mon réveil  elle ne choquait\n' +
  'pas    ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de\n' +
  'se  rendre compte que le bougeoir n’était plus allumé.\n';

describe('Token Endpoint', () => {
  it('Should return 200 on valid email', async done => {
    const res = await client.post('/api/token').send(email);
    const data = res.body;

    expect(res.statusCode).toBe(200);
    expect(data.success).toBeTruthy();
    expect(data).toHaveProperty('token');
    done();
  });

  it('Should return 400 on invalid email', async done => {
    const res = await client.post('/api/token').send({ email: 'noemail@' });
    const data = res.body;

    expect(res.statusCode).toBe(400);
    expect(data.success).toBeFalsy();
    expect(data.message).toBe('Bad Request');
    expect(data.error).toBe(400);
    done();
  });
});

describe('Justify Endpoint', () => {
  it('Should return 200 on successful justification', async done => {
    const tokenRes = await client.post('/api/token').send(email);
    const token = tokenRes.body.token;
    const res = await client
      .post('/api/justify')
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'text/plain')
      .send(toJustify);
    const data = res.body;

    expect(res.statusCode).toBe(200);
    expect(data.success).toBeTruthy();
    expect(data).toHaveProperty('data');
    expect(data.data).toBe(expectedJustification);
    done();
  });

  it('Should return 400 on missing data', async done => {
    const tokenRes = await client.post('/api/token').send(email);
    const token = tokenRes.body.token;
    const res = await client
      .post('/api/justify')
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'text/plain')
      .send('');
    const data = res.body;

    expect(res.statusCode).toBe(400);
    expect(data.success).toBeFalsy();
    expect(data.message).toBe('Bad Request');
    expect(data.error).toBe(400);
    done();
  });

  it('Should return 401 on invalid token', async done => {
    const res = await client
      .post('/api/justify')
      .set('Authorization', 'Bearer ' + '44545s454fs54d')
      .set('Content-Type', 'text/plain')
      .send(toJustify);
    const data = res.body;

    expect(res.statusCode).toBe(401);
    expect(data.success).toBeFalsy();
    expect(data.message).toBe('Expired or invalid token');
    expect(data.error).toBe(401);
    done();
  });

  it('Should return 401 on missing token', async done => {
    const res = await client
      .post('/api/justify')
      .set('Authorization', 'Bearer')
      .set('Content-Type', 'text/plain')
      .send(toJustify);
    const data = res.body;

    expect(res.statusCode).toBe(401);
    expect(data.success).toBeFalsy();
    expect(data.message).toBe('Token not found');
    expect(data.error).toBe(401);
    done();
  });
});
