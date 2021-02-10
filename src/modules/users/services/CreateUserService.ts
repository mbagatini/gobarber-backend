import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	// Ao colocar o private, a variável privada é criada e setada automaticamente
	constructor(private usersRepository: IUsersRepository) {}

	public async execute({ name, email, password }: RequestDTO): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('Email already exists');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
