import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface RequestDTO {
	provider_id: number;
	date: Date;
}

class CreateAppointmentService {
	public async execute({
		provider_id,
		date,
	}: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(
			AppointmentsRepository,
		);

		const parsedDate = startOfHour(date);
		const findAppointmentSameDate = await appointmentsRepository.findByDate(
			parsedDate,
		);

		if (findAppointmentSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = await appointmentsRepository.create({
			provider_id,
			date: parsedDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
