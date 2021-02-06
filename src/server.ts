import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from './errors/AppError';
import routes from './routes';
import uploadConfig from './config/upload';

// Conexão com o banco
import './database';

const app = express();

// Controla quem pode acessar a API através do browser
app.use(cors());

app.use(express.json());

// Rotas da aplicação
app.use(routes);

// Rota estática para visualizar os arquivos
app.use('/files', express.static(uploadConfig.directory));

// Tratar os erros de forma global - global error handling
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		})
	}

	console.error(error);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
});

app.listen(3333, () => {
	console.log('✨ Backend executando na porta 3333');
});
