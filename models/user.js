// models/user.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('users',{
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
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            otp: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            otp_expiry: {
                type: DataTypes.DATE,
                allowNull: true
            },
            registration_number: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
                comment: 'Registration number'
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                defaultValue: 'user',
                allowNull: true
            },
            password: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('User Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = user;
