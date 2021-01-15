import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

interface RequestDTO {
	email: string;
	password: string;
}
interface ResponseDTO {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({
			where: { email }
		});

		if (!user) {
			throw new Error("Incorrect email or password combination");
		}

		// Senha criptografada
		const matchedPassword = await compare(password, user.password);

		if (!matchedPassword) {
			throw new Error("Incorrect email or password combination");
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
