// models/year.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const year = sequelize.define('years',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
    },
        {
            timestamps: true,
            paranoid: true,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('Year Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = year;
