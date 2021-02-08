import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import Appointment from './Appointment';

@Entity('user')
class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	// @OneToMany(() => Appointment)

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default User;
