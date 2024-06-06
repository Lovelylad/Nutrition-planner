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

import { update, fetch } from '../../stores/recipes/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditRecipes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    instructions: '',

    preparation_time: '',

    cooking_time: '',

    serving_info: '',

    image_url: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { recipes } = useAppSelector((state) => state.recipes);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { recipesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: recipesId }));
  }, [recipesId]);

  useEffect(() => {
    if (typeof recipes === 'object') {
      setInitialValues(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (typeof recipes === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = recipes[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [recipes]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: recipesId, data }));
    await router.push('/recipes/recipes-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit recipes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit recipes'}
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
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Instructions' hasTextareaHeight>
                <Field
                  name='instructions'
                  id='instructions'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='PreparationTime'>
                <Field
                  type='number'
                  name='preparation_time'
                  placeholder='PreparationTime'
                />
              </FormField>

              <FormField label='CookingTime'>
                <Field
                  type='number'
                  name='cooking_time'
                  placeholder='CookingTime'
                />
              </FormField>

              <FormField label='ServingInfo' hasTextareaHeight>
                <Field
                  name='serving_info'
                  as='textarea'
                  placeholder='ServingInfo'
                />
              </FormField>

              <FormField label='ImageURL'>
                <Field name='image_url' placeholder='ImageURL' />
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
                  onClick={() => router.push('/recipes/recipes-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditRecipes.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_RECIPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditRecipes;
