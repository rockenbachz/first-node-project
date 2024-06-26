import { Router } from 'express';
import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
	const appointments = await AppointmentsRepository.find();

	return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointment = new CreateAppointmentService();

		const appointment = await createAppointment.execute({
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
