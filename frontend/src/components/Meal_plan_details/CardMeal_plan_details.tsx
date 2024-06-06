import React from 'react';
import ImageField from '../ImageField';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import dataFormatter from '../../helpers/dataFormatter';
import { Pagination } from '../Pagination';
import { saveFile } from '../../helpers/fileSaver';
import LoadingSpinner from '../LoadingSpinner';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  meal_plan_details: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardUsers = ({
  meal_plan_details,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const asideScrollbarsStyle = useAppSelector(
    (state) => state.style.asideScrollbarsStyle,
  );
  const darkMode = useAppSelector((state) => state.style.darkMode);

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(
    currentUser,
    'UPDATE_MEAL_PLAN_DETAILS',
  );

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading &&
          meal_plan_details.map((item, index) => (
            <li
              key={item.id}
              className={`overflow-hidden rounded-xl border border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
              }`}
            >
              <div className='flex items-center p-6  gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-dark-800 relative'>
                <button
                  className='text-lg font-bold leading-6 line-clamp-1'
                  onClick={() => onView(item.id)}
                >
                  {item.meal_plan}
                </button>

                <div className='ml-auto '>
                  <ListActionsPopover
                    onDelete={onDelete}
                    onView={onView}
                    onEdit={onEdit}
                    itemId={item.id}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </div>
              <dl className='divide-y divide-gray-100 dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500 dark:text-dark-600'>MealPlan</dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {dataFormatter.meal_plansOneListFormatter(item.meal_plan)}
                    </div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500 dark:text-dark-600'>Recipe</dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {dataFormatter.recipesOneListFormatter(item.recipe)}
                    </div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500 dark:text-dark-600'>Day</dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>{item.day}</div>
                  </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500 dark:text-dark-600'>MealType</dt>
                  <dd className='flex items-start gap-x-2'>
                    <div className='font-medium line-clamp-4'>
                      {item.meal_type}
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        {!loading && meal_plan_details.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </ul>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default CardUsers;
