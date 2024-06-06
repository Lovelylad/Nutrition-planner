import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organization/organizationSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const OrganizationView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organization } = useAppSelector((state) => state.organization);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View organization')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organization')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organization?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.users_organization &&
                      Array.isArray(organization.users_organization) &&
                      organization.users_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organization?.users_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Foods organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Calories</th>

                      <th>Macronutrients</th>

                      <th>Micronutrients</th>

                      <th>ServingSize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.foods_organization &&
                      Array.isArray(organization.foods_organization) &&
                      organization.foods_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/foods/foods-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='calories'>{item.calories}</td>

                          <td data-label='macronutrients'>
                            {item.macronutrients}
                          </td>

                          <td data-label='micronutrients'>
                            {item.micronutrients}
                          </td>

                          <td data-label='serving_size'>{item.serving_size}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organization?.foods_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Meal_plan_details organization
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>

                      <th>MealType</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.meal_plan_details_organization &&
                      Array.isArray(
                        organization.meal_plan_details_organization,
                      ) &&
                      organization.meal_plan_details_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/meal_plan_details/meal_plan_details-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='day'>{item.day}</td>

                            <td data-label='meal_type'>{item.meal_type}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organization?.meal_plan_details_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Meal_plans organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>StartDate</th>

                      <th>EndDate</th>

                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.meal_plans_organization &&
                      Array.isArray(organization.meal_plans_organization) &&
                      organization.meal_plans_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/meal_plans/meal_plans-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>

                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organization?.meal_plans_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Profiles organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Age</th>

                      <th>Gender</th>

                      <th>ActivityLevel</th>

                      <th>DietaryRestrictions</th>

                      <th>HealthGoals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.profiles_organization &&
                      Array.isArray(organization.profiles_organization) &&
                      organization.profiles_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/profiles/profiles-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='age'>{item.age}</td>

                          <td data-label='gender'>{item.gender}</td>

                          <td data-label='activity_level'>
                            {item.activity_level}
                          </td>

                          <td data-label='dietary_restrictions'>
                            {item.dietary_restrictions}
                          </td>

                          <td data-label='health_goals'>{item.health_goals}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organization?.profiles_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Recipe_ingredients organization
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.recipe_ingredients_organization &&
                      Array.isArray(
                        organization.recipe_ingredients_organization,
                      ) &&
                      organization.recipe_ingredients_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/recipe_ingredients/recipe_ingredients-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='quantity'>{item.quantity}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organization?.recipe_ingredients_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Recipes organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>PreparationTime</th>

                      <th>CookingTime</th>

                      <th>ServingInfo</th>

                      <th>ImageURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.recipes_organization &&
                      Array.isArray(organization.recipes_organization) &&
                      organization.recipes_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/recipes/recipes-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='preparation_time'>
                            {item.preparation_time}
                          </td>

                          <td data-label='cooking_time'>{item.cooking_time}</td>

                          <td data-label='serving_info'>{item.serving_info}</td>

                          <td data-label='image_url'>{item.image_url}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organization?.recipes_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              User_activities organization
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ActivityType</th>

                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organization.user_activities_organization &&
                      Array.isArray(
                        organization.user_activities_organization,
                      ) &&
                      organization.user_activities_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/user_activities/user_activities-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='activity_type'>
                              {item.activity_type}
                            </td>

                            <td data-label='timestamp'>
                              {dataFormatter.dateTimeFormatter(item.timestamp)}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organization?.user_activities_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organization/organization-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATION'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationView;
