'use strict';

const authorModel = (sequelize, DataTypes) =>
  sequelize.define('author', {
    name: { type: DataTypes.STRING, required: true },
    yearPublished: { type: DataTypes.INTEGER, required: true },
  });

module.exports = authorModel;
