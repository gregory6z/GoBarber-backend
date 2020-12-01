/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import UploadConfig from '../config/upload';

import AppError from '../errors/App.Errors';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static execute: any;

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      // deletar avatar anterior

      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
