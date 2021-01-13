import 'reflect-metadata';
import express from 'express';
import routes from './routes';

// Conexão com o banco
import './database';

const app = express();

app.use(express.json());

// Rotas da aplicação
app.use(routes);

app.listen(3333, () => {
	console.log('✨ Backend executando na porta 3333');
});
