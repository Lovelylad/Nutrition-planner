module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'foods',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'meal_plan_details',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'meal_plans',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'organizations',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'profiles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'recipe_ingredients',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'recipes',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'user_activities',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'organization',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'calories',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'macronutrients',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'micronutrients',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'serving_size',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plan_details',
        'meal_planId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'meal_plans',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plan_details',
        'recipeId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'recipes',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plan_details',
        'day',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plan_details',
        'meal_type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plans',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plans',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plans',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plans',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organizations',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organizations',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organizations',
        'phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'age',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'gender',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Male', 'Female', 'Other'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'activity_level',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Sedentary', 'Active', 'HighlyActive'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'dietary_restrictions',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'health_goals',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipe_ingredients',
        'recipeId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'recipes',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipe_ingredients',
        'foodId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'foods',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipe_ingredients',
        'quantity',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'instructions',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'preparation_time',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'cooking_time',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'serving_info',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'image_url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'user_activities',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'user_activities',
        'activity_type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['MealCreation', 'MealConsumption'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'user_activities',
        'timestamp',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'role_customization',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'app_roleId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organization',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'globalAccess',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'foods',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plan_details',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'meal_plans',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'profiles',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipe_ingredients',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'recipes',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'user_activities',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organization',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('user_activities', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'recipe_ingredients',
        'organizationId',
        { transaction },
      );

      await queryInterface.removeColumn('profiles', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plans', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plan_details', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('foods', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'globalAccess', {
        transaction,
      });

      await queryInterface.removeColumn('organization', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'app_roleId', { transaction });

      await queryInterface.removeColumn('roles', 'role_customization', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn('user_activities', 'timestamp', {
        transaction,
      });

      await queryInterface.removeColumn('user_activities', 'activity_type', {
        transaction,
      });

      await queryInterface.removeColumn('user_activities', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'image_url', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'serving_info', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'cooking_time', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'preparation_time', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'instructions', {
        transaction,
      });

      await queryInterface.removeColumn('recipes', 'title', { transaction });

      await queryInterface.removeColumn('recipe_ingredients', 'quantity', {
        transaction,
      });

      await queryInterface.removeColumn('recipe_ingredients', 'foodId', {
        transaction,
      });

      await queryInterface.removeColumn('recipe_ingredients', 'recipeId', {
        transaction,
      });

      await queryInterface.removeColumn('profiles', 'health_goals', {
        transaction,
      });

      await queryInterface.removeColumn('profiles', 'dietary_restrictions', {
        transaction,
      });

      await queryInterface.removeColumn('profiles', 'activity_level', {
        transaction,
      });

      await queryInterface.removeColumn('profiles', 'gender', { transaction });

      await queryInterface.removeColumn('profiles', 'age', { transaction });

      await queryInterface.removeColumn('profiles', 'userId', { transaction });

      await queryInterface.removeColumn('organizations', 'phone', {
        transaction,
      });

      await queryInterface.removeColumn('organizations', 'address', {
        transaction,
      });

      await queryInterface.removeColumn('organizations', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plans', 'name', { transaction });

      await queryInterface.removeColumn('meal_plans', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plans', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plans', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plan_details', 'meal_type', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plan_details', 'day', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plan_details', 'recipeId', {
        transaction,
      });

      await queryInterface.removeColumn('meal_plan_details', 'meal_planId', {
        transaction,
      });

      await queryInterface.removeColumn('foods', 'serving_size', {
        transaction,
      });

      await queryInterface.removeColumn('foods', 'micronutrients', {
        transaction,
      });

      await queryInterface.removeColumn('foods', 'macronutrients', {
        transaction,
      });

      await queryInterface.removeColumn('foods', 'calories', { transaction });

      await queryInterface.removeColumn('foods', 'name', { transaction });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('organization', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('user_activities', { transaction });

      await queryInterface.dropTable('recipes', { transaction });

      await queryInterface.dropTable('recipe_ingredients', { transaction });

      await queryInterface.dropTable('profiles', { transaction });

      await queryInterface.dropTable('organizations', { transaction });

      await queryInterface.dropTable('meal_plans', { transaction });

      await queryInterface.dropTable('meal_plan_details', { transaction });

      await queryInterface.dropTable('foods', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
