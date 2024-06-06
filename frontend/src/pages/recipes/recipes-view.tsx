import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/recipes/recipesSlice';
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

const RecipesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((state) => state.recipes);

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
        <title>{getPageTitle('View recipes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View recipes')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{recipes?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Instructions</p>
            {recipes.instructions ? (
              <p dangerouslySetInnerHTML={{ __html: recipes.instructions }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PreparationTime</p>
            <p>{recipes?.preparation_time || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CookingTime</p>
            <p>{recipes?.cooking_time || 'No data'}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={recipes?.serving_info}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ImageURL</p>
            <p>{recipes?.image_url}</p>
          </div>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>organization</p>

              <p>{recipes?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <>
            <p className={'block font-bold mb-2'}>Meal_plan_details Recipe</p>
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
                    {recipes.meal_plan_details_recipe &&
                      Array.isArray(recipes.meal_plan_details_recipe) &&
                      recipes.meal_plan_details_recipe.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!recipes?.meal_plan_details_recipe?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Recipe_ingredients Recipe</p>
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
                    {recipes.recipe_ingredients_recipe &&
                      Array.isArray(recipes.recipe_ingredients_recipe) &&
                      recipes.recipe_ingredients_recipe.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!recipes?.recipe_ingredients_recipe?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/recipes/recipes-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

RecipesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_RECIPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default RecipesView;
