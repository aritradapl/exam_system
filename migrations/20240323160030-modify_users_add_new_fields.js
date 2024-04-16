'use strict';

const { after } = require('underscore');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'status', {
      type:Sequelize.TINYINT,
      defaultValue:1,
      after:'password'
    });
    await queryInterface.addColumn('users', 'otp', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after:'phone'
    });
    await queryInterface.addColumn('users', 'otp_expiry', {
      type: Sequelize.DATE,
      allowNull: true,
      after:'otp'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'status');
    await queryInterface.removeColumn('users', 'otp');
    await queryInterface.removeColumn('users', 'otp_expiry');
  }
};
