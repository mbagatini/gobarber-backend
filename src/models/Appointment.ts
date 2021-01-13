import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointment')
class Appointment {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	provider_id: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' })
	provider: User;

	@Column('timestamp')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Appointment;
