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
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    decription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: DataTypes.DOUBLE,
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};