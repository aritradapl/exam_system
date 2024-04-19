// models/user.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const questionBank = sequelize.define('questions',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        exam_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        section_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        question_status: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
    },
    {
        timestamps: true,
        paranoid: true, // soft delete
    }
);
sequelize.sync({
}).then(() => {
    console.log('Questions Table synchronized successfully!');
}).catch((error) => {
    console.error('Unable to synchronized table: ', error);
});

module.exports = questionBank;
