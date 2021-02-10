import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

interface RequestDTO {
	user_id: string;
	avatarFilename: string;
}

class UpdateUserAvatarService {
	public async execute({
		user_id,
		avatarFilename,
	}: RequestDTO): Promise<User> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({
			where: {
				id: user_id,
			},
		});

		if (!user) {
			throw new AppError('User not authenticated', 401);
		}

		// Apaga o avatar anterior
		if (user.avatar) {
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		// Grava o novo avatar
		user.avatar = avatarFilename;

		await userRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
