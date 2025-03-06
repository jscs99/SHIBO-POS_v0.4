// models/categoryModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CategoryModel = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

return CategoryModel;
};
