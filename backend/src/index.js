const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const foodsRoutes = require('./routes/foods');

const meal_plan_detailsRoutes = require('./routes/meal_plan_details');

const meal_plansRoutes = require('./routes/meal_plans');

const organizationsRoutes = require('./routes/organizations');

const profilesRoutes = require('./routes/profiles');

const recipe_ingredientsRoutes = require('./routes/recipe_ingredients');

const recipesRoutes = require('./routes/recipes');

const user_activitiesRoutes = require('./routes/user_activities');

const permissionsRoutes = require('./routes/permissions');

const rolesRoutes = require('./routes/roles');

const organizationRoutes = require('./routes/organization');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Nutrition planner',
      description:
        'Nutrition planner Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/foods',
  passport.authenticate('jwt', { session: false }),
  foodsRoutes,
);

app.use(
  '/api/meal_plan_details',
  passport.authenticate('jwt', { session: false }),
  meal_plan_detailsRoutes,
);

app.use(
  '/api/meal_plans',
  passport.authenticate('jwt', { session: false }),
  meal_plansRoutes,
);

app.use(
  '/api/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationsRoutes,
);

app.use(
  '/api/profiles',
  passport.authenticate('jwt', { session: false }),
  profilesRoutes,
);

app.use(
  '/api/recipe_ingredients',
  passport.authenticate('jwt', { session: false }),
  recipe_ingredientsRoutes,
);

app.use(
  '/api/recipes',
  passport.authenticate('jwt', { session: false }),
  recipesRoutes,
);

app.use(
  '/api/user_activities',
  passport.authenticate('jwt', { session: false }),
  user_activitiesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/organization',
  passport.authenticate('jwt', { session: false }),
  organizationRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
