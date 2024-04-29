// models/institution.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const institution = sequelize.define('institutions',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        institution_name: {
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
        },
    },
        {
            timestamps: true,
            paranoid: false,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('Institution Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = institution;
