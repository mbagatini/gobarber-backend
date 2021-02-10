import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { provider_id, date } = request.body;

		const ISODate = parseISO(date);

		const createAppointment = container.resolve(CreateAppointmentService);

		const appointment = await createAppointment.execute({
			provider_id,
			date: ISODate,
		});

		return response.json(appointment);
	}
}