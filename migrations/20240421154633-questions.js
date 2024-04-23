'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      exam_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ques_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ques_input_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      negative_marks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('questions');
  }
};
