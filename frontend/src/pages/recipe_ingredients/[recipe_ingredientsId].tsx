import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/recipe_ingredients/recipe_ingredientsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditRecipe_ingredients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    recipe: '',

    food: '',

    quantity: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { recipe_ingredients } = useAppSelector(
    (state) => state.recipe_ingredients,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { recipe_ingredientsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: recipe_ingredientsId }));
  }, [recipe_ingredientsId]);

  useEffect(() => {
    if (typeof recipe_ingredients === 'object') {
      setInitialValues(recipe_ingredients);
    }
  }, [recipe_ingredients]);

  useEffect(() => {
    if (typeof recipe_ingredients === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = recipe_ingredients[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [recipe_ingredients]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: recipe_ingredientsId, data }));
    await router.push('/recipe_ingredients/recipe_ingredients-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit recipe_ingredients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit recipe_ingredients'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Recipe' labelFor='recipe'>
                <Field
                  name='recipe'
                  id='recipe'
                  component={SelectField}
                  options={initialValues.recipe}
                  itemRef={'recipes'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='Food' labelFor='food'>
                <Field
                  name='food'
                  id='food'
                  component={SelectField}
                  options={initialValues.food}
                  itemRef={'foods'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Quantity'>
                <Field type='number' name='quantity' placeholder='Quantity' />
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organization'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/recipe_ingredients/recipe_ingredients-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditRecipe_ingredients.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_RECIPE_INGREDIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditRecipe_ingredients;
