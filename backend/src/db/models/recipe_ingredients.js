const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const recipe_ingredients = sequelize.define(
    'recipe_ingredients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.DECIMAL,
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

  recipe_ingredients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.recipe_ingredients.belongsTo(db.recipes, {
      as: 'recipe',
      foreignKey: {
        name: 'recipeId',
      },
      constraints: false,
    });

    db.recipe_ingredients.belongsTo(db.foods, {
      as: 'food',
      foreignKey: {
        name: 'foodId',
      },
      constraints: false,
    });

    db.recipe_ingredients.belongsTo(db.organization, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.recipe_ingredients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.recipe_ingredients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return recipe_ingredients;
};
