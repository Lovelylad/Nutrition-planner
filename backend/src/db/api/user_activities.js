const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class User_activitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const user_activities = await db.user_activities.create(
      {
        id: data.id || undefined,

        activity_type: data.activity_type || null,
        timestamp: data.timestamp || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await user_activities.setUser(data.user || null, {
      transaction,
    });

    await user_activities.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return user_activities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const user_activitiesData = data.map((item, index) => ({
      id: item.id || undefined,

      activity_type: item.activity_type || null,
      timestamp: item.timestamp || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const user_activities = await db.user_activities.bulkCreate(
      user_activitiesData,
      { transaction },
    );

    // For each item created, replace relation files

    return user_activities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const user_activities = await db.user_activities.findByPk(
      id,
      {},
      { transaction },
    );

    await user_activities.update(
      {
        activity_type: data.activity_type || null,
        timestamp: data.timestamp || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await user_activities.setUser(data.user || null, {
      transaction,
    });

    await user_activities.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return user_activities;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const user_activities = await db.user_activities.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of user_activities) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of user_activities) {
        await record.destroy({ transaction });
      }
    });

    return user_activities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const user_activities = await db.user_activities.findByPk(id, options);

    await user_activities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await user_activities.destroy({
      transaction,
    });

    return user_activities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const user_activities = await db.user_activities.findOne(
      { where },
      { transaction },
    );

    if (!user_activities) {
      return user_activities;
    }

    const output = user_activities.get({ plain: true });

    output.user = await user_activities.getUser({
      transaction,
    });

    output.organization = await user_activities.getOrganization({
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
        model: db.users,
        as: 'user',
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

      if (filter.timestampRange) {
        const [start, end] = filter.timestampRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            timestamp: {
              ...where.timestamp,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            timestamp: {
              ...where.timestamp,
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

      if (filter.activity_type) {
        where = {
          ...where,
          activity_type: filter.activity_type,
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
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
          count: await db.user_activities.count({
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
      : await db.user_activities.findAndCountAll({
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
          Utils.ilike('user_activities', 'activity_type', query),
        ],
      };
    }

    const records = await db.user_activities.findAll({
      attributes: ['id', 'activity_type'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['activity_type', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.activity_type,
    }));
  }
};
