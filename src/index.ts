import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import Logger from './utils/Logger';
import { sequelize } from './utils/sequelize';
import ApiRoute from './routes/apiRoute';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => res.status(200).send('<h1>Vaccine Management App</h1>'));
app.use('/api', ApiRoute);

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
