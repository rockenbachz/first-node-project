import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'rockenbach',
	password: 'rockzera1337',
	database: 'tw_barber',
	migrations: ['./src/database/migrations/*.ts'],
});

export default AppDataSource;

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch(err => {
		console.error('Error during Data Source initialization', err);
	});
