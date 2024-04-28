// models/examDetails.js
"use strict";

const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const examDetails = sequelize.define('exam_details',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        exam_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        institution_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_marks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        passing_marks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
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
        }
    },
        {
            timestamps: true,
            paranoid: false,
        }
    );
    sequelize.sync({
    }).then(() => {
        console.log('Exam Details Table synchronized successfully!');
    }).catch((error) => {
        console.error('Unable to synchronized table: ', error);
    });

    module.exports = examDetails;
