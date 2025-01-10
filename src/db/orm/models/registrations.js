'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Registrations extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.belongsTo(models.Events, { foreignKey: 'eventId', as: 'Event' });
    }
  }

  Registrations.init(
    {
      registrationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticketPdf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Registrations',
      tableName: 'registrations',
      timestamps: false, // If you don't have createdAt/updatedAt columns
      paranoid: true, // Enable soft deletes (deletedAt column)
      underscored: true, // Use snake_case in database columns
    }
  );

  return Registrations;
};

'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Registrations extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.belongsTo(models.Events, { foreignKey: 'eventId', as: 'Event' });
    }
  }

  Registrations.init(
    {
      registrationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticketPdf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Registrations',
      tableName: 'registrations',
      timestamps: false, // If you don't have createdAt/updatedAt columns
      paranoid: true, // Enable soft deletes (deletedAt column)
      underscored: true, // Use snake_case in database columns
    }
  );

  return Registrations;
};
