const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('opal', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Połączono z MySQL za pomocą Sequelize'))
    .catch(err => console.error('Błąd połączenia:', err));

sequelize.sync()
    .then(() => console.log('Synchronizacja przebiegła pomyślnie'))
    .catch(error => console.error('Wywaliło jakiś błąd', error));

module.exports = sequelize; 
