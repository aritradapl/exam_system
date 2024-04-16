// models/user.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const questionTypes = sequelize.define('question_types',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        timestamps: true,
        paranoid: true, // soft delete
    }
);
sequelize.sync({
}).then(() => {
    console.log('Question Types Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = questionTypes;
