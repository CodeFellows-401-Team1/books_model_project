'use strict';

const bookModel = (sequelize, DataTypes) =>
  sequelize.define('Books', {
    title: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: true },
    genre: { type: DataTypes.STRING, required: true },
  });

module.exports = bookModel;
