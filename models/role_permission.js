'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    
    static associate(models) {
      role_permission.belongsTo(models.permission, {
        foreignKey: 'permission_id'
      });
      role_permission.belongsTo(models.role, {
        foreignKey: 'role_id'
      });
    }
  }
  
  role_permission.init({
    role_permission_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role_permission',
  });
  return role_permission;
};