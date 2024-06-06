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
} from '../../stores/meal_plan_details/meal_plan_detailsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditMeal_plan_details = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    meal_plan: '',

    recipe: '',

    day: '',

    meal_type: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { meal_plan_details } = useAppSelector(
    (state) => state.meal_plan_details,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { meal_plan_detailsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: meal_plan_detailsId }));
  }, [meal_plan_detailsId]);

  useEffect(() => {
    if (typeof meal_plan_details === 'object') {
      setInitialValues(meal_plan_details);
    }
  }, [meal_plan_details]);

  useEffect(() => {
    if (typeof meal_plan_details === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = meal_plan_details[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [meal_plan_details]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: meal_plan_detailsId, data }));
    await router.push('/meal_plan_details/meal_plan_details-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit meal_plan_details')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit meal_plan_details'}
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
              <FormField label='MealPlan' labelFor='meal_plan'>
                <Field
                  name='meal_plan'
                  id='meal_plan'
                  component={SelectField}
                  options={initialValues.meal_plan}
                  itemRef={'meal_plans'}
                  showField={'name'}
                ></Field>
              </FormField>

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

              <FormField label='Day'>
                <Field name='day' placeholder='Day' />
              </FormField>

              <FormField label='MealType' labelFor='meal_type'>
                <Field name='MealType' id='MealType' component='select'>
                  <option value='Breakfast'>Breakfast</option>

                  <option value='Lunch'>Lunch</option>

                  <option value='Dinner'>Dinner</option>

                  <option value='Snack'>Snack</option>
                </Field>
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
                    router.push('/meal_plan_details/meal_plan_details-list')
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

EditMeal_plan_details.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MEAL_PLAN_DETAILS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMeal_plan_details;
