import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import appointmentsRouter from './routes/appointments.routes';

// Conexão com o banco
import './database';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/appointments', appointmentsRouter);

app.listen(3333, () => {
	console.log('==> Backend executando na porta 3333');
});