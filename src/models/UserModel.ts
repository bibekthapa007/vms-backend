import { DataTypes, Model, NumberDataTypeOptions } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../utils/sequelize';

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare verified: boolean;
  declare password: string;
  declare created_at: Date;
  declare updated_at: Date;

  declare validPassword: (password: string) => Promise<boolean>;
  declare getHashed: (password: string) => Promise<string>;
  declare beforeCreate: (user: any) => Promise<void>;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    verified: {
      type: DataTypes.INTEGER(1 as NumberDataTypeOptions),
      allowNull: false,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      field: 'created_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updated_at: {
      type: 'TIMESTAMP',
      field: 'updated_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'user',
    modelName: 'user',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    indexes: [{ unique: true, fields: ['email'] }],
  },
);
const saltRounds = 10;
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
User.prototype.getHashed = async function (password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
});
export default User;
