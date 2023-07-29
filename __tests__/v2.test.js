'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const { db } = require('../src/models');
const mockServer = supertest(server);

// define a user to test
// let testUser;
// let testWriter;
// let testAdmin;
// before all sync up the db and create the user in the db to test against
beforeAll(async () => {
  db.sync();
});
// after all drop the table
afterAll(async () => {
  db.drop({});
});

describe('v2 routes work as expected', () => {
  test('we can create a new user', async () => {
    const response = await mockServer
      .post('/signup')
      .send({ username: 'test', password: '123', role: 'admin' });
    console.log(response.body.user);
    expect(response.status).toEqual(201);
  });
  test('we can create a book with a valid user', async () => {
    const response = await mockServer
      .post('/api/v2/book')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2Njk3MzF9.IIvre-u84ZB8C-58NL5A1pTV6PrG2Nwf2VsiwNpycUk'
      )
      .send({
        title: 'Hello',
        description: 'This works',
        genre: 'this is a book',
      });
    expect(response.status).toBe(201);
  });
  test('we can retrieve the created book', async () => {
    const response = await mockServer
      .get('/api/v2/book')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2Njk3MzF9.IIvre-u84ZB8C-58NL5A1pTV6PrG2Nwf2VsiwNpycUk'
      )
      .send({
        title: 'Hello',
        description: 'This works',
        genre: 'this is a book',
      });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  test('we can create an author with a valid user', async () => {
    const response = await mockServer
      .post('/api/v2/author')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2Njk3MzF9.IIvre-u84ZB8C-58NL5A1pTV6PrG2Nwf2VsiwNpycUk'
      )
      .send({
        name: 'Hello',
        yearPublished: 2023,
      });
    expect(response.status).toBe(201);
  });
  test('we can retrieve the created author', async () => {
    const response = await mockServer
      .get('/api/v2/author')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2Njk3MzF9.IIvre-u84ZB8C-58NL5A1pTV6PrG2Nwf2VsiwNpycUk'
      )
      .send({
        name: 'Hello',
        yearPublished: 2023,
      });
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
