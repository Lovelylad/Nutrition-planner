const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const foods = sequelize.define(
    'foods',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      calories: {
        type: DataTypes.DECIMAL,
      },

      macronutrients: {
        type: DataTypes.TEXT,
      },

      micronutrients: {
        type: DataTypes.TEXT,
      },

      serving_size: {
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

  foods.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.foods.hasMany(db.recipe_ingredients, {
      as: 'recipe_ingredients_food',
      foreignKey: {
        name: 'foodId',
      },
      constraints: false,
    });

    //end loop

    db.foods.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.foods.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.foods.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return foods;
};
