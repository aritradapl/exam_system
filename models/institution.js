// models/year.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const institution = sequelize.define('years',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        exam_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
        {
            timestamps: true,
            paranoid: true,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('Institution Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = institution;
