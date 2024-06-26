const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const profiles = sequelize.define(
    'profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      age: {
        type: DataTypes.INTEGER,
      },

      gender: {
        type: DataTypes.ENUM,

        values: ['Male', 'Female', 'Other'],
      },

      activity_level: {
        type: DataTypes.ENUM,

        values: ['Sedentary', 'Active', 'HighlyActive'],
      },

      dietary_restrictions: {
        type: DataTypes.TEXT,
      },

      health_goals: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  profiles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.profiles.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.profiles.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.profiles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.profiles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return profiles;
};
