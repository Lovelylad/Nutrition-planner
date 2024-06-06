const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Recipe_ingredientsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipe_ingredients = await db.recipe_ingredients.create(
      {
        id: data.id || undefined,

        quantity: data.quantity || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipe_ingredients.setRecipe(data.recipe || null, {
      transaction,
    });

    await recipe_ingredients.setFood(data.food || null, {
      transaction,
    });

    await recipe_ingredients.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    return recipe_ingredients;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const recipe_ingredientsData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity: item.quantity || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const recipe_ingredients = await db.recipe_ingredients.bulkCreate(
      recipe_ingredientsData,
      { transaction },
    );

    // For each item created, replace relation files

    return recipe_ingredients;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const recipe_ingredients = await db.recipe_ingredients.findByPk(
      id,
      {},
      { transaction },
    );

    await recipe_ingredients.update(
      {
        quantity: data.quantity || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipe_ingredients.setRecipe(data.recipe || null, {
      transaction,
    });

    await recipe_ingredients.setFood(data.food || null, {
      transaction,
    });

    await recipe_ingredients.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return recipe_ingredients;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipe_ingredients = await db.recipe_ingredients.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of recipe_ingredients) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of recipe_ingredients) {
        await record.destroy({ transaction });
      }
    });

    return recipe_ingredients;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipe_ingredients = await db.recipe_ingredients.findByPk(
      id,
      options,
    );

    await recipe_ingredients.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await recipe_ingredients.destroy({
      transaction,
    });

    return recipe_ingredients;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const recipe_ingredients = await db.recipe_ingredients.findOne(
      { where },
      { transaction },
    );

    if (!recipe_ingredients) {
      return recipe_ingredients;
    }

    const output = recipe_ingredients.get({ plain: true });

    output.recipe = await recipe_ingredients.getRecipe({
      transaction,
    });

    output.food = await recipe_ingredients.getFood({
      transaction,
    });

    output.organization = await recipe_ingredients.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.recipes,
        as: 'recipe',
      },

      {
        model: db.foods,
        as: 'food',
      },

      {
        model: db.organization,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.recipe) {
        var listItems = filter.recipe.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          recipeId: { [Op.or]: listItems },
        };
      }

      if (filter.food) {
        var listItems = filter.food.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          foodId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.recipe_ingredients.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.recipe_ingredients.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('recipe_ingredients', 'recipe', query),
        ],
      };
    }

    const records = await db.recipe_ingredients.findAll({
      attributes: ['id', 'recipe'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['recipe', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.recipe,
    }));
  }
};
