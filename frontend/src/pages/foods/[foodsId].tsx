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

import { update, fetch } from '../../stores/foods/foodsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditFoods = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    calories: '',

    macronutrients: '',

    micronutrients: '',

    serving_size: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { foods } = useAppSelector((state) => state.foods);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { foodsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: foodsId }));
  }, [foodsId]);

  useEffect(() => {
    if (typeof foods === 'object') {
      setInitialValues(foods);
    }
  }, [foods]);

  useEffect(() => {
    if (typeof foods === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = foods[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [foods]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: foodsId, data }));
    await router.push('/foods/foods-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit foods')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit foods'}
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
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Calories'>
                <Field type='number' name='calories' placeholder='Calories' />
              </FormField>

              <FormField label='Macronutrients' hasTextareaHeight>
                <Field
                  name='macronutrients'
                  as='textarea'
                  placeholder='Macronutrients'
                />
              </FormField>

              <FormField label='Micronutrients' hasTextareaHeight>
                <Field
                  name='micronutrients'
                  as='textarea'
                  placeholder='Micronutrients'
                />
              </FormField>

              <FormField label='ServingSize'>
                <Field name='serving_size' placeholder='ServingSize' />
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
                  onClick={() => router.push('/foods/foods-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditFoods.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_FOODS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditFoods;
