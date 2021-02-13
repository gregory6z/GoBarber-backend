import 'reflect-metadata';
import ShowProfileService from '../services/ShowProfileService';

import AppError from '@shared/errors/App.Errors';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
describe('showProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gregory',
      email: 'gregory232@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });
    expect(profile.name).toBe('gregory');
    expect(profile.email).toBe('gregory232@gmail.com');
  });
  it('should be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
