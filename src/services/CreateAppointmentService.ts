import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
	provider_id: number;
	date: Date;
}

class CreateAppointmentService {

	public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const parsedDate = startOfHour(date);
		const findAppointmentSameDate = await appointmentsRepository.findByDate(parsedDate);

		if (findAppointmentSameDate) {
			throw new AppError("This appointment is already booked");
		}

		const appointment = appointmentsRepository.create({ provider_id, date: parsedDate });

		await appointmentsRepository.save(appointment);

		return appointment;
	}

}

export default CreateAppointmentService;
