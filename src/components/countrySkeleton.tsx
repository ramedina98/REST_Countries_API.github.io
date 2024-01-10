import React from 'react';

const CountrySkeleton: React.FC = () => {
    return (
        <div className='bg-white dark:bg-gray-800 w-300 h-cartH rounded flex flex-col items-center justify-center shadow-sm cursor-pointer dark:border-gray-600 animate-pulse'>
        <div className='w-full h-half'>
            <div className='w-full h-full bg-gray-300 dark:bg-gray-600'></div>
        </div>
        <div className='w-full h-half'>
            <div className='w-full py-5'>
            <h3 className='ml-7 font-bold text-titleCountry dark:text-white bg-gray-300 dark:bg-gray-600 h-5'></h3>
            </div>
            <div className='w-full h-auto'>
            <ul className='w-full h-auto text-gray-900 dark:text-white'>
                <li className='ml-7 py-1 font-semibold'>Population: <span className='font-thin bg-gray-300 dark:bg-gray-600 h-3 w-10 block'></span></li>
                <li className='ml-7 py-1 font-semibold'>Region: <span className='font-thin bg-gray-300 dark:bg-gray-600 h-3 w-10 block'></span></li>
                <li className='ml-7 py-1 font-semibold'>Capital: <span className='font-thin bg-gray-300 dark:bg-gray-600 h-3 w-10 block'></span></li>
            </ul>
            </div>
        </div>
        </div>
    );
};

export default CountrySkeleton;