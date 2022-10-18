import { Sequelize, Op } from 'sequelize';
import Logger from './Logger';

const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  dialect: 'mysql',
  host: dbHost,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    freezeTableName: true,
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000,
    // },
  },
});

sequelize.sync({ alter: true }).then(() => {
  Logger.info(`Database & tables created here!`);
});

export { Sequelize };
