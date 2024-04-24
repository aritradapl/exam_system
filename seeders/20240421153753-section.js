'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('sections', [
      {
        section_name: 'I',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        section_name: 'II',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        section_name: 'III',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        section_name: 'IV',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        section_name: 'V',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('sections', null, {});
  }
};
