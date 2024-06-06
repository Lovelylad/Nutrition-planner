const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const recipes = sequelize.define(
    'recipes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      instructions: {
        type: DataTypes.TEXT,
      },

      preparation_time: {
        type: DataTypes.INTEGER,
      },

      cooking_time: {
        type: DataTypes.INTEGER,
      },

      serving_info: {
        type: DataTypes.TEXT,
      },

      image_url: {
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

  recipes.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.recipes.hasMany(db.meal_plan_details, {
      as: 'meal_plan_details_recipe',
      foreignKey: {
        name: 'recipeId',
      },
      constraints: false,
    });

    db.recipes.hasMany(db.recipe_ingredients, {
      as: 'recipe_ingredients_recipe',
      foreignKey: {
        name: 'recipeId',
      },
      constraints: false,
    });

    //end loop

    db.recipes.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.recipes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.recipes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return recipes;
};
