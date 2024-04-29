// models/exam.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const exam = sequelize.define('exams',{
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
            paranoid: false,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('Exam Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = exam;
