const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Meal_plan_detailsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plan_details = await db.meal_plan_details.create(
      {
        id: data.id || undefined,

        day: data.day || null,
        meal_type: data.meal_type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await meal_plan_details.setMeal_plan(data.meal_plan || null, {
      transaction,
    });

    await meal_plan_details.setRecipe(data.recipe || null, {
      transaction,
    });

    await meal_plan_details.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    return meal_plan_details;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const meal_plan_detailsData = data.map((item, index) => ({
      id: item.id || undefined,

      day: item.day || null,
      meal_type: item.meal_type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const meal_plan_details = await db.meal_plan_details.bulkCreate(
      meal_plan_detailsData,
      { transaction },
    );

    // For each item created, replace relation files

    return meal_plan_details;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const meal_plan_details = await db.meal_plan_details.findByPk(
      id,
      {},
      { transaction },
    );

    await meal_plan_details.update(
      {
        day: data.day || null,
        meal_type: data.meal_type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await meal_plan_details.setMeal_plan(data.meal_plan || null, {
      transaction,
    });

    await meal_plan_details.setRecipe(data.recipe || null, {
      transaction,
    });

    await meal_plan_details.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return meal_plan_details;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plan_details = await db.meal_plan_details.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of meal_plan_details) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of meal_plan_details) {
        await record.destroy({ transaction });
      }
    });

    return meal_plan_details;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plan_details = await db.meal_plan_details.findByPk(id, options);

    await meal_plan_details.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await meal_plan_details.destroy({
      transaction,
    });

    return meal_plan_details;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const meal_plan_details = await db.meal_plan_details.findOne(
      { where },
      { transaction },
    );

    if (!meal_plan_details) {
      return meal_plan_details;
    }

    const output = meal_plan_details.get({ plain: true });

    output.meal_plan = await meal_plan_details.getMeal_plan({
      transaction,
    });

    output.recipe = await meal_plan_details.getRecipe({
      transaction,
    });

    output.organization = await meal_plan_details.getOrganization({
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
        model: db.meal_plans,
        as: 'meal_plan',
      },

      {
        model: db.recipes,
        as: 'recipe',
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

      if (filter.day) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('meal_plan_details', 'day', filter.day),
        };
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

      if (filter.meal_type) {
        where = {
          ...where,
          meal_type: filter.meal_type,
        };
      }

      if (filter.meal_plan) {
        var listItems = filter.meal_plan.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          meal_planId: { [Op.or]: listItems },
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
          count: await db.meal_plan_details.count({
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
      : await db.meal_plan_details.findAndCountAll({
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
          Utils.ilike('meal_plan_details', 'meal_plan', query),
        ],
      };
    }

    const records = await db.meal_plan_details.findAll({
      attributes: ['id', 'meal_plan'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['meal_plan', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.meal_plan,
    }));
  }
};
