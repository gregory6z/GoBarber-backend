import 'reflect-metadata';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/App.Errors';

import FakeHashProvider from '../../users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakesCacheProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let CreateUser: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    CreateUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await CreateUser.execute({
      name: 'gregory',
      email: 'gregoryrag989@gmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    await CreateUser.execute({
      name: 'gregory',
      email: 'gregoryrag989@gmail.com',
      password: '123456',
    });
    await expect(
      CreateUser.execute({
        name: 'gregory',
        email: 'gregoryrag989@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
