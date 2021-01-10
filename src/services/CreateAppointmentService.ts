import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface RequestDTO {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	private appointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: RequestDTO): Appointment {
		const parsedDate = startOfHour(date);
		const findAppointmentSameDate = this.appointmentsRepository.findByDate(parsedDate);

		if (findAppointmentSameDate) {
			throw Error("This appointment is already booked");
		}

		const appointment = this.appointmentsRepository.create({ provider, date: parsedDate });

		return appointment;
	}

}

export default CreateAppointmentService;
