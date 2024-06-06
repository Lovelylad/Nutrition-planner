

const db = require('../models');
const Users = db.users;

const Foods = db.foods;

const MealPlanDetails = db.meal_plan_details;

const MealPlans = db.meal_plans;

const Organizations = db.organizations;

const Profiles = db.profiles;

const RecipeIngredients = db.recipe_ingredients;

const Recipes = db.recipes;

const UserActivities = db.user_activities;

const Organization = db.organization;

const FoodsData = [

    {

                "name": "Apple",

                "calories": 52,

                "macronutrients": "{"protein": 0.3, "carbs": 14, "fats": 0.2}",

                "micronutrients": "{"vitaminC": 4.6, "potassium": 107}",

                "serving_size": "1 medium (182g)",

                // type code here for "relation_one" field

    },

    {

                "name": "Chicken Breast",

                "calories": 165,

                "macronutrients": "{"protein": 31, "carbs": 0, "fats": 3.6}",

                "micronutrients": "{"vitaminB6": 0.6, "phosphorus": 196}",

                "serving_size": "100g",

                // type code here for "relation_one" field

    },

    {

                "name": "Broccoli",

                "calories": 55,

                "macronutrients": "{"protein": 3.7, "carbs": 11.2, "fats": 0.6}",

                "micronutrients": "{"vitaminC": 89.2, "calcium": 47}",

                "serving_size": "1 cup (91g)",

                // type code here for "relation_one" field

    },

];

const MealPlanDetailsData = [

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "day": "Day 1",

                "meal_type": "Dinner",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "day": "Day 2",

                "meal_type": "Dinner",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "day": "Day 3",

                "meal_type": "Dinner",

                // type code here for "relation_one" field

    },

];

const MealPlansData = [

    {

                // type code here for "relation_one" field

                "start_date": new Date('2023-06-01T00:00:00Z'),

                "end_date": new Date('2023-06-07T23:59:59Z'),

                "name": "Weekly Weight Loss Plan",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "start_date": new Date('2023-06-08T00:00:00Z'),

                "end_date": new Date('2023-06-14T23:59:59Z'),

                "name": "Vegan Muscle Gain Plan",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "start_date": new Date('2023-06-15T00:00:00Z'),

                "end_date": new Date('2023-06-21T23:59:59Z'),

                "name": "Gluten-Free Maintenance Plan",

                // type code here for "relation_one" field

    },

];

const OrganizationsData = [

    {

                "name": "Healthy Life Nutrition",

                "address": "123 Wellness St, Health City, HC 12345",

                "phone": "123-456-7890",

    },

    {

                "name": "Fit and Fresh",

                "address": "456 Fitness Ave, Active Town, AT 67890",

                "phone": "234-567-8901",

    },

    {

                "name": "NutriWell",

                "address": "789 Nutrition Blvd, Vitality Village, VV 11223",

                "phone": "345-678-9012",

    },

];

const ProfilesData = [

    {

                // type code here for "relation_one" field

                "age": 30,

                "gender": "Female",

                "activity_level": "Sedentary",

                "dietary_restrictions": "[]",

                "health_goals": "["Weight Loss"]",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "age": 28,

                "gender": "Male",

                "activity_level": "Sedentary",

                "dietary_restrictions": "["Vegan"]",

                "health_goals": "["Muscle Gain"]",

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "age": 35,

                "gender": "Male",

                "activity_level": "Sedentary",

                "dietary_restrictions": "["Gluten-Free"]",

                "health_goals": "["Maintain Weight"]",

                // type code here for "relation_one" field

    },

];

const RecipeIngredientsData = [

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "quantity": 1,

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "quantity": 1,

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                // type code here for "relation_one" field

                "quantity": 1,

                // type code here for "relation_one" field

    },

];

const RecipesData = [

    {

                "title": "Grilled Chicken Salad",

                "instructions": "1. Grill the chicken breast.
2. Mix with lettuce, tomatoes, and cucumbers.
3. Add olive oil and lemon juice.",

                "preparation_time": 10,

                "cooking_time": 15,

                "serving_info": "Serves 2",

                "image_url": "https://example.com/images/grilled_chicken_salad.jpg",

                // type code here for "relation_one" field

    },

    {

                "title": "Vegan Buddha Bowl",

                "instructions": "1. Cook quinoa.
2. Add roasted chickpeas, avocado, and mixed greens.
3. Drizzle with tahini sauce.",

                "preparation_time": 15,

                "cooking_time": 20,

                "serving_info": "Serves 1",

                "image_url": "https://example.com/images/vegan_buddha_bowl.jpg",

                // type code here for "relation_one" field

    },

    {

                "title": "Keto Avocado Smoothie",

                "instructions": "1. Blend avocado, spinach, and almond milk.
2. Add a scoop of protein powder.
3. Serve chilled.",

                "preparation_time": 5,

                "cooking_time": 0,

                "serving_info": "Serves 1",

                "image_url": "https://example.com/images/keto_avocado_smoothie.jpg",

                // type code here for "relation_one" field

    },

];

const UserActivitiesData = [

    {

                // type code here for "relation_one" field

                "activity_type": "MealConsumption",

                "timestamp": new Date('2023-06-01T12:00:00Z'),

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "activity_type": "MealCreation",

                "timestamp": new Date('2023-06-02T12:00:00Z'),

                // type code here for "relation_one" field

    },

    {

                // type code here for "relation_one" field

                "activity_type": "MealCreation",

                "timestamp": new Date('2023-06-03T12:00:00Z'),

                // type code here for "relation_one" field

    },

];

const OrganizationData = [

    {

                "name": "Arthur Eddington",

    },

    {

                "name": "Charles Lyell",

    },

    {

                "name": "Alexander Fleming",

    },

];

            // Similar logic for "relation_many"

            async function associateUserWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const User0 = await Users.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (User0?.setOrganization)
                {
                    await
                    User0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const User1 = await Users.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (User1?.setOrganization)
                {
                    await
                    User1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const User2 = await Users.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (User2?.setOrganization)
                {
                    await
                    User2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateFoodWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Food0 = await Foods.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Food0?.setOrganization)
                {
                    await
                    Food0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Food1 = await Foods.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Food1?.setOrganization)
                {
                    await
                    Food1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Food2 = await Foods.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Food2?.setOrganization)
                {
                    await
                    Food2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateMealPlanDetailWithMeal_plan() {

                const relatedMeal_plan0 = await MealPlans.findOne({
                    offset: Math.floor(Math.random() * (await MealPlans.count())),
                });
                const MealPlanDetail0 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MealPlanDetail0?.setMeal_plan)
                {
                    await
                    MealPlanDetail0.
                    setMeal_plan(relatedMeal_plan0);
                }

                const relatedMeal_plan1 = await MealPlans.findOne({
                    offset: Math.floor(Math.random() * (await MealPlans.count())),
                });
                const MealPlanDetail1 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MealPlanDetail1?.setMeal_plan)
                {
                    await
                    MealPlanDetail1.
                    setMeal_plan(relatedMeal_plan1);
                }

                const relatedMeal_plan2 = await MealPlans.findOne({
                    offset: Math.floor(Math.random() * (await MealPlans.count())),
                });
                const MealPlanDetail2 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MealPlanDetail2?.setMeal_plan)
                {
                    await
                    MealPlanDetail2.
                    setMeal_plan(relatedMeal_plan2);
                }

        }

            async function associateMealPlanDetailWithRecipe() {

                const relatedRecipe0 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const MealPlanDetail0 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MealPlanDetail0?.setRecipe)
                {
                    await
                    MealPlanDetail0.
                    setRecipe(relatedRecipe0);
                }

                const relatedRecipe1 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const MealPlanDetail1 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MealPlanDetail1?.setRecipe)
                {
                    await
                    MealPlanDetail1.
                    setRecipe(relatedRecipe1);
                }

                const relatedRecipe2 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const MealPlanDetail2 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MealPlanDetail2?.setRecipe)
                {
                    await
                    MealPlanDetail2.
                    setRecipe(relatedRecipe2);
                }

        }

            async function associateMealPlanDetailWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlanDetail0 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MealPlanDetail0?.setOrganization)
                {
                    await
                    MealPlanDetail0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlanDetail1 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MealPlanDetail1?.setOrganization)
                {
                    await
                    MealPlanDetail1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlanDetail2 = await MealPlanDetails.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MealPlanDetail2?.setOrganization)
                {
                    await
                    MealPlanDetail2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateMealPlanWithUser() {

                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const MealPlan0 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MealPlan0?.setUser)
                {
                    await
                    MealPlan0.
                    setUser(relatedUser0);
                }

                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const MealPlan1 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MealPlan1?.setUser)
                {
                    await
                    MealPlan1.
                    setUser(relatedUser1);
                }

                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const MealPlan2 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MealPlan2?.setUser)
                {
                    await
                    MealPlan2.
                    setUser(relatedUser2);
                }

        }

            async function associateMealPlanWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlan0 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (MealPlan0?.setOrganization)
                {
                    await
                    MealPlan0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlan1 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (MealPlan1?.setOrganization)
                {
                    await
                    MealPlan1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const MealPlan2 = await MealPlans.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (MealPlan2?.setOrganization)
                {
                    await
                    MealPlan2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateProfileWithUser() {

                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Profile0 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Profile0?.setUser)
                {
                    await
                    Profile0.
                    setUser(relatedUser0);
                }

                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Profile1 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Profile1?.setUser)
                {
                    await
                    Profile1.
                    setUser(relatedUser1);
                }

                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const Profile2 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Profile2?.setUser)
                {
                    await
                    Profile2.
                    setUser(relatedUser2);
                }

        }

            async function associateProfileWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Profile0 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Profile0?.setOrganization)
                {
                    await
                    Profile0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Profile1 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Profile1?.setOrganization)
                {
                    await
                    Profile1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Profile2 = await Profiles.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Profile2?.setOrganization)
                {
                    await
                    Profile2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateRecipeIngredientWithRecipe() {

                const relatedRecipe0 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const RecipeIngredient0 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RecipeIngredient0?.setRecipe)
                {
                    await
                    RecipeIngredient0.
                    setRecipe(relatedRecipe0);
                }

                const relatedRecipe1 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const RecipeIngredient1 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RecipeIngredient1?.setRecipe)
                {
                    await
                    RecipeIngredient1.
                    setRecipe(relatedRecipe1);
                }

                const relatedRecipe2 = await Recipes.findOne({
                    offset: Math.floor(Math.random() * (await Recipes.count())),
                });
                const RecipeIngredient2 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RecipeIngredient2?.setRecipe)
                {
                    await
                    RecipeIngredient2.
                    setRecipe(relatedRecipe2);
                }

        }

            async function associateRecipeIngredientWithFood() {

                const relatedFood0 = await Foods.findOne({
                    offset: Math.floor(Math.random() * (await Foods.count())),
                });
                const RecipeIngredient0 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RecipeIngredient0?.setFood)
                {
                    await
                    RecipeIngredient0.
                    setFood(relatedFood0);
                }

                const relatedFood1 = await Foods.findOne({
                    offset: Math.floor(Math.random() * (await Foods.count())),
                });
                const RecipeIngredient1 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RecipeIngredient1?.setFood)
                {
                    await
                    RecipeIngredient1.
                    setFood(relatedFood1);
                }

                const relatedFood2 = await Foods.findOne({
                    offset: Math.floor(Math.random() * (await Foods.count())),
                });
                const RecipeIngredient2 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RecipeIngredient2?.setFood)
                {
                    await
                    RecipeIngredient2.
                    setFood(relatedFood2);
                }

        }

            async function associateRecipeIngredientWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const RecipeIngredient0 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (RecipeIngredient0?.setOrganization)
                {
                    await
                    RecipeIngredient0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const RecipeIngredient1 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (RecipeIngredient1?.setOrganization)
                {
                    await
                    RecipeIngredient1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const RecipeIngredient2 = await RecipeIngredients.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (RecipeIngredient2?.setOrganization)
                {
                    await
                    RecipeIngredient2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateRecipeWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Recipe0 = await Recipes.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (Recipe0?.setOrganization)
                {
                    await
                    Recipe0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Recipe1 = await Recipes.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (Recipe1?.setOrganization)
                {
                    await
                    Recipe1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const Recipe2 = await Recipes.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (Recipe2?.setOrganization)
                {
                    await
                    Recipe2.
                    setOrganization(relatedOrganization2);
                }

        }

            async function associateUserActivityWithUser() {

                const relatedUser0 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const UserActivity0 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (UserActivity0?.setUser)
                {
                    await
                    UserActivity0.
                    setUser(relatedUser0);
                }

                const relatedUser1 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const UserActivity1 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (UserActivity1?.setUser)
                {
                    await
                    UserActivity1.
                    setUser(relatedUser1);
                }

                const relatedUser2 = await Users.findOne({
                    offset: Math.floor(Math.random() * (await Users.count())),
                });
                const UserActivity2 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (UserActivity2?.setUser)
                {
                    await
                    UserActivity2.
                    setUser(relatedUser2);
                }

        }

            async function associateUserActivityWithOrganization() {

                const relatedOrganization0 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const UserActivity0 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 0
                });
                if (UserActivity0?.setOrganization)
                {
                    await
                    UserActivity0.
                    setOrganization(relatedOrganization0);
                }

                const relatedOrganization1 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const UserActivity1 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 1
                });
                if (UserActivity1?.setOrganization)
                {
                    await
                    UserActivity1.
                    setOrganization(relatedOrganization1);
                }

                const relatedOrganization2 = await Organization.findOne({
                    offset: Math.floor(Math.random() * (await Organization.count())),
                });
                const UserActivity2 = await UserActivities.findOne({
                    order: [['id', 'ASC']],
                    offset: 2
                });
                if (UserActivity2?.setOrganization)
                {
                    await
                    UserActivity2.
                    setOrganization(relatedOrganization2);
                }

        }

module.exports = {
    up: async (queryInterface, Sequelize) => {

                await Foods.bulkCreate(FoodsData);

                await MealPlanDetails.bulkCreate(MealPlanDetailsData);

                await MealPlans.bulkCreate(MealPlansData);

                await Organizations.bulkCreate(OrganizationsData);

                await Profiles.bulkCreate(ProfilesData);

                await RecipeIngredients.bulkCreate(RecipeIngredientsData);

                await Recipes.bulkCreate(RecipesData);

                await UserActivities.bulkCreate(UserActivitiesData);

                await Organization.bulkCreate(OrganizationData);

            await Promise.all([

                        // Similar logic for "relation_many"

                        await associateUserWithOrganization(),

                        await associateFoodWithOrganization(),

                        await associateMealPlanDetailWithMeal_plan(),

                        await associateMealPlanDetailWithRecipe(),

                        await associateMealPlanDetailWithOrganization(),

                        await associateMealPlanWithUser(),

                        await associateMealPlanWithOrganization(),

                        await associateProfileWithUser(),

                        await associateProfileWithOrganization(),

                        await associateRecipeIngredientWithRecipe(),

                        await associateRecipeIngredientWithFood(),

                        await associateRecipeIngredientWithOrganization(),

                        await associateRecipeWithOrganization(),

                        await associateUserActivityWithUser(),

                        await associateUserActivityWithOrganization(),

            ]);

    },

    down: async (queryInterface, Sequelize) => {

            await queryInterface.bulkDelete('foods', null, {});

            await queryInterface.bulkDelete('meal_plan_details', null, {});

            await queryInterface.bulkDelete('meal_plans', null, {});

            await queryInterface.bulkDelete('organizations', null, {});

            await queryInterface.bulkDelete('profiles', null, {});

            await queryInterface.bulkDelete('recipe_ingredients', null, {});

            await queryInterface.bulkDelete('recipes', null, {});

            await queryInterface.bulkDelete('user_activities', null, {});

            await queryInterface.bulkDelete('organization', null, {});

    },
};
