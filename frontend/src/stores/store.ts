import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import foodsSlice from './foods/foodsSlice';
import meal_plan_detailsSlice from './meal_plan_details/meal_plan_detailsSlice';
import meal_plansSlice from './meal_plans/meal_plansSlice';
import organizationsSlice from './organizations/organizationsSlice';
import profilesSlice from './profiles/profilesSlice';
import recipe_ingredientsSlice from './recipe_ingredients/recipe_ingredientsSlice';
import recipesSlice from './recipes/recipesSlice';
import user_activitiesSlice from './user_activities/user_activitiesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import rolesSlice from './roles/rolesSlice';
import organizationSlice from './organization/organizationSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    foods: foodsSlice,
    meal_plan_details: meal_plan_detailsSlice,
    meal_plans: meal_plansSlice,
    organizations: organizationsSlice,
    profiles: profilesSlice,
    recipe_ingredients: recipe_ingredientsSlice,
    recipes: recipesSlice,
    user_activities: user_activitiesSlice,
    permissions: permissionsSlice,
    roles: rolesSlice,
    organization: organizationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
