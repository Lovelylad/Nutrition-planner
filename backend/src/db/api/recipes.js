const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RecipesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        instructions: data.instructions || null,
        preparation_time: data.preparation_time || null,
        cooking_time: data.cooking_time || null,
        serving_info: data.serving_info || null,
        image_url: data.image_url || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipes.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return recipes;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const recipesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      instructions: item.instructions || null,
      preparation_time: item.preparation_time || null,
      cooking_time: item.cooking_time || null,
      serving_info: item.serving_info || null,
      image_url: item.image_url || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const recipes = await db.recipes.bulkCreate(recipesData, { transaction });

    // For each item created, replace relation files

    return recipes;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const recipes = await db.recipes.findByPk(id, {}, { transaction });

    await recipes.update(
      {
        title: data.title || null,
        instructions: data.instructions || null,
        preparation_time: data.preparation_time || null,
        cooking_time: data.cooking_time || null,
        serving_info: data.serving_info || null,
        image_url: data.image_url || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipes.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return recipes;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of recipes) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of recipes) {
        await record.destroy({ transaction });
      }
    });

    return recipes;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findByPk(id, options);

    await recipes.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await recipes.destroy({
      transaction,
    });

    return recipes;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findOne({ where }, { transaction });

    if (!recipes) {
      return recipes;
    }

    const output = recipes.get({ plain: true });

    output.meal_plan_details_recipe = await recipes.getMeal_plan_details_recipe(
      {
        transaction,
      },
    );

    output.recipe_ingredients_recipe =
      await recipes.getRecipe_ingredients_recipe({
        transaction,
      });

    output.organization = await recipes.getOrganization({
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

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'title', filter.title),
        };
      }

      if (filter.instructions) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'instructions', filter.instructions),
        };
      }

      if (filter.serving_info) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'serving_info', filter.serving_info),
        };
      }

      if (filter.image_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'image_url', filter.image_url),
        };
      }

      if (filter.preparation_timeRange) {
        const [start, end] = filter.preparation_timeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            preparation_time: {
              ...where.preparation_time,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            preparation_time: {
              ...where.preparation_time,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.cooking_timeRange) {
        const [start, end] = filter.cooking_timeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            cooking_time: {
              ...where.cooking_time,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            cooking_time: {
              ...where.cooking_time,
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
          count: await db.recipes.count({
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
      : await db.recipes.findAndCountAll({
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
          Utils.ilike('recipes', 'title', query),
        ],
      };
    }

    const records = await db.recipes.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
