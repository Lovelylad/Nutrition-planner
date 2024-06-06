const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProfilesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const profiles = await db.profiles.create(
      {
        id: data.id || undefined,

        age: data.age || null,
        gender: data.gender || null,
        activity_level: data.activity_level || null,
        dietary_restrictions: data.dietary_restrictions || null,
        health_goals: data.health_goals || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await profiles.setUser(data.user || null, {
      transaction,
    });

    await profiles.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return profiles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const profilesData = data.map((item, index) => ({
      id: item.id || undefined,

      age: item.age || null,
      gender: item.gender || null,
      activity_level: item.activity_level || null,
      dietary_restrictions: item.dietary_restrictions || null,
      health_goals: item.health_goals || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const profiles = await db.profiles.bulkCreate(profilesData, {
      transaction,
    });

    // For each item created, replace relation files

    return profiles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const profiles = await db.profiles.findByPk(id, {}, { transaction });

    await profiles.update(
      {
        age: data.age || null,
        gender: data.gender || null,
        activity_level: data.activity_level || null,
        dietary_restrictions: data.dietary_restrictions || null,
        health_goals: data.health_goals || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await profiles.setUser(data.user || null, {
      transaction,
    });

    await profiles.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return profiles;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const profiles = await db.profiles.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of profiles) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of profiles) {
        await record.destroy({ transaction });
      }
    });

    return profiles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const profiles = await db.profiles.findByPk(id, options);

    await profiles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await profiles.destroy({
      transaction,
    });

    return profiles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const profiles = await db.profiles.findOne({ where }, { transaction });

    if (!profiles) {
      return profiles;
    }

    const output = profiles.get({ plain: true });

    output.user = await profiles.getUser({
      transaction,
    });

    output.organization = await profiles.getOrganization({
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

      if (filter.dietary_restrictions) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'profiles',
            'dietary_restrictions',
            filter.dietary_restrictions,
          ),
        };
      }

      if (filter.health_goals) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'profiles',
            'health_goals',
            filter.health_goals,
          ),
        };
      }

      if (filter.ageRange) {
        const [start, end] = filter.ageRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            age: {
              ...where.age,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            age: {
              ...where.age,
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

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
        };
      }

      if (filter.activity_level) {
        where = {
          ...where,
          activity_level: filter.activity_level,
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
          count: await db.profiles.count({
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
      : await db.profiles.findAndCountAll({
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
          Utils.ilike('profiles', 'user', query),
        ],
      };
    }

    const records = await db.profiles.findAll({
      attributes: ['id', 'user'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['user', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.user,
    }));
  }
};
