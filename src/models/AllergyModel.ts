import { DataTypes, Model, NumberDataTypeOptions } from 'sequelize';
import { sequelize } from '../utils/sequelize';

class Allergy extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare timing: string;
}

Allergy.init(
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
    timing: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    vaccine_id: {
      type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'allergy',
    modelName: 'allergy',
  },
);

export default Allergy;
