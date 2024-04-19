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

// For Server Railway Database

// const { Sequelize } = require('sequelize');
// require('dotenv').config();
// // Railway automatically loads environment variables from .env file

// // Creating the connection
// const sequelize = new Sequelize(
//     process.env.RAILWAY_DATABASE_URL, // Railway provides a DATABASE_URL which contains all necessary info
//     {
//         dialect: 'mysql', // Set the dialect to MySQL
//         logging: false // Disable logging to prevent logs from appearing in the console
//     }
// );

// // Authenticating the connection
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database: ', error);
//     });

// module.exports = sequelize;
