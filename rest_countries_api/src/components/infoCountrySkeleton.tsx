import React from 'react';

const CountryInfoSkeleton: React.FC = () => {
    return (
        <div className='py-4'>
        {/* Back button */}
            <div className='py-4'>
                {/* TODO: Your back button skeleton */}
            </div>
        {/* Country information skeleton */}
            <div className='my-2 py-4 flex items-center justify-between flex-row flex-wrap gap-4'>
                {/* Flag skeleton */}
                <div className='w-all h-bigFlag 635:w-bigFlag'>
                {/* TODO: Your flag image skeleton */}
                </div>
                {/* Country details */}
                <div className='w-infoDiv h-auto py-3 flex items-start justify-around flex-col 635:h-bigFlag'>
                {/* Country name */}
                <div className='py-2 w-all'>
                    {/* TODO: Your country name skeleton */}
                </div>
                {/* Details list */}
                <div className='mt-5 w-all h-auto flex items-center justify-between flex-wrap gap-1'>
                    {/* Left details column */}
                    <ul className='w-list h-auto dark:text-whitepy-2'>
                    {/* TODO: Your left details skeleton */}
                    </ul>
                    {/* Right details column */}
                    <ul className='w-list h-auto py-2'>
                    {/* TODO: Your right details skeleton */}
                    </ul>
                </div>
                {/* Border countries */}
                <div className='w-all h-auto py-3 flex items-center justify-center '>
                    <div className='w-1/5 py-4'>
                    {/* TODO: Your border countries skeleton */}
                    </div>
                    <ul className='w-4/5 h-auto flex items-center justify-start flex-wrap gap-3'>
                    {/* TODO: Your border countries list skeleton */}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default CountryInfoSkeleton;