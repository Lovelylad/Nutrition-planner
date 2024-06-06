import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/meal_plan_details/meal_plan_detailsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  meal_plan: '',

  recipe: '',

  day: '',

  meal_type: 'Breakfast',

  organization: '',
};

const Meal_plan_detailsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/meal_plan_details/meal_plan_details-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='MealPlan' labelFor='meal_plan'>
                <Field
                  name='meal_plan'
                  id='meal_plan'
                  component={SelectField}
                  options={[]}
                  itemRef={'meal_plans'}
                ></Field>
              </FormField>

              <FormField label='Recipe' labelFor='recipe'>
                <Field
                  name='recipe'
                  id='recipe'
                  component={SelectField}
                  options={[]}
                  itemRef={'recipes'}
                ></Field>
              </FormField>

              <FormField label='Day'>
                <Field name='day' placeholder='Day' />
              </FormField>

              <FormField label='MealType' labelFor='meal_type'>
                <Field name='meal_type' id='meal_type' component='select'>
                  <option value='Breakfast'>Breakfast</option>

                  <option value='Lunch'>Lunch</option>

                  <option value='Dinner'>Dinner</option>

                  <option value='Snack'>Snack</option>
                </Field>
              </FormField>

              <FormField label='organization' labelFor='organization'>
                <Field
                  name='organization'
                  id='organization'
                  component={SelectField}
                  options={[]}
                  itemRef={'organization'}
                ></Field>
              </FormField>

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

Meal_plan_detailsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_MEAL_PLAN_DETAILS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Meal_plan_detailsNew;
