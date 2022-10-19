import { NonAttribute } from 'sequelize/types';
import { DataTypes, Model, NumberDataTypeOptions } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import Allergy from './AllergyModel';

class Vaccine extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare no_of_doses: string;
  declare is_mandatory: boolean;
  declare image_link: string;

  declare vaccine_allergies: NonAttribute<Allergy[]>;
}

Vaccine.init(
  {
    id: {
      type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    no_of_doses: {
      type: DataTypes.INTEGER(),
      validate: {
        min: 1,
      },
      allowNull: false,
    },
    is_mandatory: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
    },
    image_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'vaccine',
    modelName: 'vaccine',
  },
);

export default Vaccine;
