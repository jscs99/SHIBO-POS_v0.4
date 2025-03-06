// config/dbconnect.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chivopos-db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('MySQL Connection Successful');
  })
  .catch(err => {
    console.log('MySQL Connection Failed:', err);
  });

module.exports = sequelize;

