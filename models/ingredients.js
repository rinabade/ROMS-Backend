'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ingredients.init({
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps :true,
    modelName: 'ingredients',
  });
  return ingredients;
};