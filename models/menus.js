'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    static associate(models) {
      // menus.hasMany(models.ingredients, {
      //   foreignKey: 'ingredient_id'
      // });
    }
  }
  menus.init({
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    decription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};