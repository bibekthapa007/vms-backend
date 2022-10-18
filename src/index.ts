import { Sequelize } from 'sequelize';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import Logger from './utils/Logger';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => res.status(200).send('<h1>Vaccine Management App Api</h1>'));

const port = process.env.port;
server.listen(port, () => {
  Logger.info(`Server running on port ${port}`);
});
