import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
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

const UsersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

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
        <title>{getPageTitle('View users')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View users')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>First Name</p>
            <p>{users?.firstName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Last Name</p>
            <p>{users?.lastName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone Number</p>
            <p>{users?.phoneNumber}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>E-Mail</p>
            <p>{users?.email}</p>
          </div>

          <FormField label='Disabled'>
            <SwitchField
              field={{ name: 'disabled', value: users?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Avatar</p>
            {users?.avatar?.length ? (
              <ImageField
                name={'avatar'}
                image={users?.avatar}
                className='w-20 h-20'
              />
            ) : (
              <p>No Avatar</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>App Role</p>

            <p>{users?.app_role?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Custom Permissions</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.custom_permissions &&
                      Array.isArray(users.custom_permissions) &&
                      users.custom_permissions.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/permissions/permissions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.custom_permissions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>Organization</p>

              <p>{users?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <>
            <p className={'block font-bold mb-2'}>Meal_plans User</p>
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
                    {users.meal_plans_user &&
                      Array.isArray(users.meal_plans_user) &&
                      users.meal_plans_user.map((item: any) => (
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
              {!users?.meal_plans_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Profiles User</p>
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
                    {users.profiles_user &&
                      Array.isArray(users.profiles_user) &&
                      users.profiles_user.map((item: any) => (
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
              {!users?.profiles_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>User_activities User</p>
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
                    {users.user_activities_user &&
                      Array.isArray(users.user_activities_user) &&
                      users.user_activities_user.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!users?.user_activities_user?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/users/users-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USERS'}>{page}</LayoutAuthenticated>
  );
};

export default UsersView;
