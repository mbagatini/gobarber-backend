import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findById(id: number): Promise<User> {
		const user = await this.ormRepository.findOne(id);

		return user;
	}

	public async findByEmail(email: string): Promise<User> {
		const user = await this.ormRepository.findOne({
			where: { email },
		});

		return user;
	}

	public async save(data: User): Promise<User> {
		return this.ormRepository.save(data);
	}

	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			name,
			email,
			password,
		});

		await this.ormRepository.save(user);

		return user;
	}
}

export default UsersRepository;