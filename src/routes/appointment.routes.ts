import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
	const appointments = appointmentsRepository.all();

	return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService(
			appointmentsRepository,
		);

		const appointment = createAppointment.execute({
			date: parsedDate,
			provider,
		});

		return response.json(appointment);
	} catch (err) {
		let errorMessage = 'Error';
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return response.status(400).json({ error: errorMessage });
	}
});

export default appointmentsRouter;
