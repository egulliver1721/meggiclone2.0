import { Request, Response } from 'express';
import signup from '../signup';

describe('signup route', () => {
  it('should respond with 201 and success message if user is created', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await signup(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Your account has been created successfully' });
  });

  it('should respond with 400 and error message if invalid signup information is provided', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await signup(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Invalid signup information' });
  });
});
