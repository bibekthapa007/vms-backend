import { Sequelize } from 'sequelize';
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

import User from '../models/UserModel';
import Allergy from '../models/AllergyModel';
import Vaccine from '../models/VaccineModel';
import VaccineAllergy from '../models/VaccineAllergyModel';

// Use this, if relationship is many to many
// Vaccine.belongsToMany(Allergy, { through: VaccineAllergy, foreignKey: 'allergy_id' });
// Allergy.belongsToMany(Vaccine, { through: VaccineAllergy, foreignKey: 'vaccine_id' });

Vaccine.hasMany(Allergy, { foreignKey: 'vaccine_id', onDelete: 'CASCADE' });

sequelize.sync({ force: false, alter: true }).then(() => {
  Logger.info(`Database sync successfully`);
});

export { Sequelize, User, Vaccine, Allergy, VaccineAllergy };
