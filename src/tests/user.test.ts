import request from 'supertest';
import app from '../index';
import { sequelize } from '../models';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('User API', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single user by ID', async () => {
        const user = await request(app)
            .post('/api/users')
            .send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123'
            });
        const res = await request(app).get(`/api/users/${user.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should update a user by ID', async () => {
        const user = await request(app)
            .post('/api/users')
            .send({
                name: 'Update User',
                email: 'update@example.com',
                password: 'password123'
            });
        const res = await request(app)
            .put(`/api/users/${user.body.id}`)
            .send({
                name: 'Updated User'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Updated User');
    });

    it('should delete a user by ID', async () => {
        const user = await request(app)
            .post('/api/users')
            .send({
                name: 'Delete User',
                email: 'delete@example.com',
                password: 'password123'
            });
        const res = await request(app).delete(`/api/users/${user.body.id}`);
        expect(res.statusCode).toEqual(204);
    });
});
