'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Events extends Model {
    static associate(models) {
      // Define associations here
      this.belongsTo(models.User, { foreignKey: 'organizerId', as: "organizer"});
    }
  }

  Events.init({
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
  }, 
  {
    sequelize,
    modelName: 'Events',
    tableName: 'events',
    timestamps: false, // Set to false if createdAt and updatedAt are managed manually
    paranoid: true, // Enable soft deletes (deletedAt column)
    underscored: true, // Use snake case for column names
  });

  return Events;
};
