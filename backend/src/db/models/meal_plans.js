const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const meal_plans = sequelize.define(
    'meal_plans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      name: {
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

  meal_plans.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.meal_plans.hasMany(db.meal_plan_details, {
      as: 'meal_plan_details_meal_plan',
      foreignKey: {
        name: 'meal_planId',
      },
      constraints: false,
    });

    //end loop

    db.meal_plans.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.meal_plans.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.meal_plans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.meal_plans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return meal_plans;
};
