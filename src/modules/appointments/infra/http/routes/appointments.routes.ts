import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();
	return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const ISODate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: ISODate,
	});

	return response.json(appointment);
});

export default appointmentsRouter;