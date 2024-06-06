import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  profiles: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListProfiles = ({
  profiles,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_PROFILES');

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          profiles.map((item) => (
            <CardBox hasTable key={item.id} className={'rounded'}>
              <div className={'flex items-center overflow-hidden'}>
                <div
                  className={
                    'flex-1 px-4 py-6 h-24 flex items-stretch divide-x-2 dark:divide-dark-700 overflow-x-auto'
                  }
                  onClick={() => onView(item.id)}
                >
                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>User</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.usersOneListFormatter(item.user)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Age</p>
                    <p className={'line-clamp-2'}>{item.age}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Gender</p>
                    <p className={'line-clamp-2'}>{item.gender}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>ActivityLevel</p>
                    <p className={'line-clamp-2'}>{item.activity_level}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>
                      DietaryRestrictions
                    </p>
                    <p className={'line-clamp-2'}>
                      {item.dietary_restrictions}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>HealthGoals</p>
                    <p className={'line-clamp-2'}>{item.health_goals}</p>
                  </div>
                </div>
                <ListActionsPopover
                  onDelete={onDelete}
                  onView={onView}
                  onEdit={onEdit}
                  itemId={item.id}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </div>
            </CardBox>
          ))}
        {!loading && profiles.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListProfiles;
