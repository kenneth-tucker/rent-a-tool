const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env['DB_NAME'] as string,
  process.env['DB_USER'] as string,
  process.env['DB_PASSWORD'] as string,
  {
    host: process.env['DB_HOST'],
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  initializeDatabase
};