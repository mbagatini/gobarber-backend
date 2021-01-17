import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import uploadConfig from './config/upload';

// Conexão com o banco
import './database';

const app = express();

app.use(express.json());

// Rotas da aplicação
app.use(routes);

// Rota estática para visualizar os arquivos
app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
	console.log('✨ Backend executando na porta 3333');
});
