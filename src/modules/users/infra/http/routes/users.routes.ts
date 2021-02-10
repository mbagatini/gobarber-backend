import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import CreateUserService from '../../../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = container.resolve(CreateUserService);

	const user = await createUser.execute({
		name,
		email,
		password,
	});

	delete user.password;

	return response.json(user);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateAvatar.execute({
			user_id: Number(request.user.id),
			avatarFilename: request.file.filename,
		});

		delete user.password;

		return response.json(user);
	},
);

export default usersRouter;
