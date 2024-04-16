const { Sequelize } = require('sequelize');
require('dotenv').config();

// Creating the connection
try{
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            host: process.env.DATABASE_HOST,
            dialect: process.env.DATABASE_DRIVER
        }
    );

    // Authenticating the connection
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });

    module.exports = sequelize;
}
catch(error){
    console.log(error);
}
