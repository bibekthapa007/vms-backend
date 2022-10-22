import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';

import Logger from './utils/Logger';
import { sequelize } from './utils/sequelize';
import ApiRoute from './routes/apiRoute';
import { errorHandler } from './middlewares/errorhandler';

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(helmet());
app.use(
  cors({
    credentials: true,
  }),
);
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(multer().single('file'));

app.get('/', (req, res) => res.status(200).send('<h1>Vaccine Management App</h1>'));
app.use('/api', ApiRoute);
app.use(errorHandler);

const port = process.env.port;
server.listen(port, () => {
  Logger.info(`Server started running on port ${port}`);
});

sequelize
  .authenticate()
  .then(() => {
    Logger.info('Database Connection has been established successfully.');
  })
  .catch((error) => {
    Logger.error('Unable to connect to the database:', error);
  });

process.on('uncaughtException', (error) => {
  Logger.error('uncaughtException', error);
});

process.on('unhandledRejection', (error) => {
  Logger.error('unhandledRejection', error);
});
