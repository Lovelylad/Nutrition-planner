import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/foods/foods-list',
    label: 'Foods',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFood ? icon.mdiFood : icon.mdiTable,
    permissions: 'READ_FOODS',
  },
  {
    href: '/meal_plan_details/meal_plan_details-list',
    label: 'Meal plan details',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFoodForkDrink ? icon.mdiFoodForkDrink : icon.mdiTable,
    permissions: 'READ_MEAL_PLAN_DETAILS',
  },
  {
    href: '/meal_plans/meal_plans-list',
    label: 'Meal plans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendar ? icon.mdiCalendar : icon.mdiTable,
    permissions: 'READ_MEAL_PLANS',
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiOfficeBuilding ? icon.mdiOfficeBuilding : icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/profiles/profiles-list',
    label: 'Profiles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountDetails ? icon.mdiAccountDetails : icon.mdiTable,
    permissions: 'READ_PROFILES',
  },
  {
    href: '/recipe_ingredients/recipe_ingredients-list',
    label: 'Recipe ingredients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFoodVariant ? icon.mdiFoodVariant : icon.mdiTable,
    permissions: 'READ_RECIPE_INGREDIENTS',
  },
  {
    href: '/recipes/recipes-list',
    label: 'Recipes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBookOpenPageVariant
      ? icon.mdiBookOpenPageVariant
      : icon.mdiTable,
    permissions: 'READ_RECIPES',
  },
  {
    href: '/user_activities/user_activities-list',
    label: 'User activities',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiRun ? icon.mdiRun : icon.mdiTable,
    permissions: 'READ_USER_ACTIVITIES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/organization/organization-list',
    label: 'Organization',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_ORGANIZATION',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
