import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
	email: string;
	password: string;
}
interface ResponseDTO {
	user: User;
	token: string;
}

@injectable()
class AuthenticateUserService {
	// Ao colocar o private, a variável privada é criada e setada automaticamente
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({
		email,
		password,
	}: RequestDTO): Promise<ResponseDTO> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email or password combination', 401);
		}

		// Senha criptografada
		const matchedPassword = await compare(password, user.password);

		if (!matchedPassword) {
			throw new AppError('Incorrect email or password combination', 401);
		}

		// Gera o JWT
		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn,
		});

		return { user, token };
	}
}

export default AuthenticateUserService;
