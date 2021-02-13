import 'reflect-metadata';
import ListProvidersService from '@modules/appointements/services/ListProvidersServices';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakesCacheProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregory232@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'gregory2',
      email: 'gregory2323@gmail.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'gregory3',
      email: 'gregory23234@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
