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

    await queryInterface.bulkInsert('years', [
      {
        year: 2030,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2029,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2028,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2027,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2026,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2025,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2024,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
