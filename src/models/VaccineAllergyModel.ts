import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/sequelize';

class VaccineAllergy extends Model {
  declare vaccine_id: number;
  declare allergy_id: number;
}

VaccineAllergy.init(
  {
    vaccine_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    allergy_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'vaccine_allergy',
    modelName: 'vaccine_allergy',
  },
);

export default VaccineAllergy;
