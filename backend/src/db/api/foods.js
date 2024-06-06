const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FoodsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const foods = await db.foods.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        calories: data.calories || null,
        macronutrients: data.macronutrients || null,
        micronutrients: data.micronutrients || null,
        serving_size: data.serving_size || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await foods.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return foods;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const foodsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      calories: item.calories || null,
      macronutrients: item.macronutrients || null,
      micronutrients: item.micronutrients || null,
      serving_size: item.serving_size || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const foods = await db.foods.bulkCreate(foodsData, { transaction });

    // For each item created, replace relation files

    return foods;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const foods = await db.foods.findByPk(id, {}, { transaction });

    await foods.update(
      {
        name: data.name || null,
        calories: data.calories || null,
        macronutrients: data.macronutrients || null,
        micronutrients: data.micronutrients || null,
        serving_size: data.serving_size || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await foods.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return foods;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const foods = await db.foods.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of foods) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of foods) {
        await record.destroy({ transaction });
      }
    });

    return foods;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const foods = await db.foods.findByPk(id, options);

    await foods.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await foods.destroy({
      transaction,
    });

    return foods;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const foods = await db.foods.findOne({ where }, { transaction });

    if (!foods) {
      return foods;
    }

    const output = foods.get({ plain: true });

    output.recipe_ingredients_food = await foods.getRecipe_ingredients_food({
      transaction,
    });

    output.organization = await foods.getOrganization({
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('foods', 'name', filter.name),
        };
      }

      if (filter.macronutrients) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'foods',
            'macronutrients',
            filter.macronutrients,
          ),
        };
      }

      if (filter.micronutrients) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'foods',
            'micronutrients',
            filter.micronutrients,
          ),
        };
      }

      if (filter.serving_size) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('foods', 'serving_size', filter.serving_size),
        };
      }

      if (filter.caloriesRange) {
        const [start, end] = filter.caloriesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            calories: {
              ...where.calories,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            calories: {
              ...where.calories,
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
          count: await db.foods.count({
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
      : await db.foods.findAndCountAll({
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
          Utils.ilike('foods', 'name', query),
        ],
      };
    }

    const records = await db.foods.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
