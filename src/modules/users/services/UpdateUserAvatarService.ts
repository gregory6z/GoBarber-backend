/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import UploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/App.Errors';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProviders';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static execute: any;

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
