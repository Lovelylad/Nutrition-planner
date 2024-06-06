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

import { create } from '../../stores/profiles/profilesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  user: '',

  age: '',

  gender: 'Male',

  activity_level: 'Sedentary',

  dietary_restrictions: '',

  health_goals: '',

  organization: '',
};

const ProfilesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/profiles/profiles-list');
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
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Age'>
                <Field type='number' name='age' placeholder='Age' />
              </FormField>

              <FormField label='Gender' labelFor='gender'>
                <Field name='gender' id='gender' component='select'>
                  <option value='Male'>Male</option>

                  <option value='Female'>Female</option>

                  <option value='Other'>Other</option>
                </Field>
              </FormField>

              <FormField label='ActivityLevel' labelFor='activity_level'>
                <Field
                  name='activity_level'
                  id='activity_level'
                  component='select'
                >
                  <option value='Sedentary'>Sedentary</option>

                  <option value='Active'>Active</option>

                  <option value='HighlyActive'>HighlyActive</option>
                </Field>
              </FormField>

              <FormField label='DietaryRestrictions' hasTextareaHeight>
                <Field
                  name='dietary_restrictions'
                  as='textarea'
                  placeholder='DietaryRestrictions'
                />
              </FormField>

              <FormField label='HealthGoals' hasTextareaHeight>
                <Field
                  name='health_goals'
                  as='textarea'
                  placeholder='HealthGoals'
                />
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
                  onClick={() => router.push('/profiles/profiles-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

ProfilesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PROFILES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProfilesNew;
