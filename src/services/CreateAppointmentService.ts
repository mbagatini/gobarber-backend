import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
	provider: string;
	date: Date;
}

class CreateAppointmentService {

	public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const parsedDate = startOfHour(date);
		const findAppointmentSameDate = await appointmentsRepository.findByDate(parsedDate);

		if (findAppointmentSameDate) {
			throw Error("This appointment is already booked");
		}

		const appointment = appointmentsRepository.create({ provider, date: parsedDate });

		await appointmentsRepository.save(appointment);

		return appointment;
	}

}

export default CreateAppointmentService;
