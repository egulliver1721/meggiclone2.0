import request from 'supertest';
import { app } from '../main';

describe('POST /login', () => {
    it('responds with 200 and success message if user is logged in', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: ' ',
            password: ' ',
        })
        .expect(200);

        expect(response.body.message).toEqual('You are logged in');
    });

    it('responds with 400 and error message if invalid login information is provided', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: ' ',
            password: ' ',
        })
        .expect(400);

        expect(response.body.message).toEqual('Invalid login information');
    }
    );
});
