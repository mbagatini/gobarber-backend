import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointment')
class Appointment {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	provider: string;

	@Column('timestamp')
	date: Date;
}

export default Appointment;
