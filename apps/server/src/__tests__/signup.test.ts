import request from 'supertest';
import { app } from '../main';

describe('POST /signup', () => {
  it('responds with 201 and success message if user is created', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        email: 'test@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(201);

    expect(response.body.message).toEqual('Your account has been created successfully');
  });

  it('responds with 400 and error message if invalid signup information is provided', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        email: 'test@example.com',
        password: 'password',
      })
      .expect(400);

    expect(response.body.message).toEqual('Invalid signup information');
  });
});
