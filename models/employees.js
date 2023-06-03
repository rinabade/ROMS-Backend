'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      employees.hasMany(models.role_permission, {
        foreignKey: 'role_permission_id'
      });
    }
  }
  employees.init({
    role_permission_id: DataTypes.INTEGER,

    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_title : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_information : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_status : {
      type: DataTypes.STRING,
      allowNull: false,
    },
   hash_token : {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps :true,
    modelName: 'employees',
  });
  return employees;
};