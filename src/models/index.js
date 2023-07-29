const { Sequelize, DataTypes } = require('sequelize');
const bookModel = require('./books.model.js');
const authorModel = require('./author.model.js');
const Collection = require('./data-collections.js');
const userModel = require('./users.model.js');

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(POSTGRES_URI);
const book = bookModel(sequelize, DataTypes);
const author = authorModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  book: new Collection(book),
  author: new Collection(author),
  users,
};
