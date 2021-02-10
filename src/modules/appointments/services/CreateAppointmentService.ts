import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface RequestDTO {
	provider_id: number;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	// Ao colocar o private, a variável privada é criada e setada automaticamente
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
		date,
	}: RequestDTO): Promise<Appointment> {
		const parsedDate = startOfHour(date);
		const findAppointmentSameDate = await this.appointmentsRepository.findByDate(
			parsedDate,
		);

		if (findAppointmentSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: parsedDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
