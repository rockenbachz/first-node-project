import { Appointment } from '../models/Appointment';
import { AppDataSource } from '../database';

export const AppointmentsRepository = AppDataSource.getRepository(
	Appointment,
).extend({
	findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = this.findOne({
			where: { date },
		});

		return findAppointment || null;
	},
});
