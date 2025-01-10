'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};