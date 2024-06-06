const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const meal_plan_details = sequelize.define(
    'meal_plan_details',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      day: {
        type: DataTypes.TEXT,
      },

      meal_type: {
        type: DataTypes.ENUM,

        values: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
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

  meal_plan_details.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.meal_plan_details.belongsTo(db.meal_plans, {
      as: 'meal_plan',
      foreignKey: {
        name: 'meal_planId',
      },
      constraints: false,
    });

    db.meal_plan_details.belongsTo(db.recipes, {
      as: 'recipe',
      foreignKey: {
        name: 'recipeId',
      },
      constraints: false,
    });

    db.meal_plan_details.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.meal_plan_details.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.meal_plan_details.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return meal_plan_details;
};
