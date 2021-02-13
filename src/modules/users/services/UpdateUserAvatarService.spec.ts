import 'reflect-metadata';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import AppError from '@shared/errors/App.Errors';

import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregory232@gmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        avatarFilename: 'avatar.jpg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregory232@gmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: 'avatar.jpg',
      user_id: user.id,
    });
    await updateUserAvatarService.execute({
      avatarFilename: 'avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
