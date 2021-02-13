import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/App.Errors';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregoryrag989@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'gregoryrag989@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should be able to authenticatec with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'gregoryrag989@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregoryrag989@gmail.com',
      password: '123456',
    });
    await expect(
      authenticateUser.execute({
        email: 'gregoryrag989@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
