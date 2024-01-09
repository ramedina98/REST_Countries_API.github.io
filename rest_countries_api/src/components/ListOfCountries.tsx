import React, { useState, useEffect } from 'react'; //TODO:borrar lo que no se ocupe...
import { Link } from 'react-router-dom';
import CountrySkeleton from './countrySkeleton';
import useCountryData from '../hooks/useApiData';

const YourComponent: React.FC = () => {
    //TODO: el codigo que esta debajo es para consumir la api...
    const { data, loading, error} = useCountryData(); 
    
    //code needed to show and hide the drop menu...
    const [showMenu, setShowMenu] = useState(false);
    const toggleDropMenu = () => {
        setShowMenu(!showMenu)
    }

    //if we have an error we return it here...
    if(error){
        return <div>Error: {error}</div>;
    }

    return (
        <section className='py-3 px-5'>
            {/*This div contains the search input and the drop down menue*/}
            <div className='flex flex-wrap gap-4 items-center justify-between relative'>
                {/*Input to search for countries...*/}
                <div className="flex items-center bg-white border-b border-gray-300 dark:border-gray-600 p-0 custom-md:w-400  w-all rounded dark:bg-gray-800">
                    <button className="bg-transparent py-4 px-5 text-gray-900 font-semibold">
                        <i className='bx bx-search-alt-2 font-bold text-xl text-gray-500 dark:text-white hover:text-gray-800'></i>
                    </button>
                    <input
                        type="text"
                        className="py-4 px-3 w-5/6 h-5/6 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                        placeholder="Example text with button addon"
                        aria-describedby="button-addon1"
                    />
                </div>
                {/*Here we have the drop down menu deployer...*/}
                <div className='bg-white py-5 custom-md:w-200  w-all border-b border-gray-300 dark:border-gray-600 flex items-center justify-evenly hover:bg-gray-100 hover:text-black cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900'
                    onClick={toggleDropMenu}
                >
                    <h3 className='text-gray-900 font-semibold dark:text-white'>Filter by Region</h3> <i className='bx bxs-chevron-down'></i>
                </div>
                {showMenu && (
                    /*this is the drop down menu item*/
                    <div className='absolute top-20 right-0 custom-md:w-200 w-all h-auto bg-white border-b border-gray-300 dark:border-gray-600'>
                        <ul className='custom-md:w-200 w-all p-2 h-auto flex items-start justify-evenly flex-col text-gray-900 font-semibold dark:bg-gray-800 dark:text-white'>
                            <li className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Africa</li>
                            <li className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>America</li>
                            <li className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Asia</li>
                            <li className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Europa</li>
                            <li className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Ociania</li>
                        </ul>
                    </div>
                )}
            </div>
            {/*the next part contains the carts that brings the flag and part of 
            the information of the countries...*/}
            <div className='py-6 flex items-center justify-center flex-wrap gap-9'>
                {loading ? (
                    //we show 8 repetitions of the skeleton...
                    Array.from({ length: 8 }, (_, index) => <CountrySkeleton key={index} />)
                ) : (
                    data && data.map((country:any) => (
                        <Link to={`/country/${country.cca3}`}>
                            <div key={country.cca3} className='bg-white dark:bg-gray-800 w-300 h-cartH rounded flex flex-col items-center justify-center shadow-sm cursor-pointer dark:border-gray-600'>
                                <div className='w-all h-half'>
                                    <img src={country.flags.png}
                                        alt={country.name.common}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-all h-half'>
                                    <div className='w-all py-5'>
                                        <h3 className='ml-7 font-bold text-titleCountry dark:text-white'>{country.name.common}</h3>
                                    </div>
                                    <div className='w-all h-auto'>
                                        <ul className='w-all h-auto text-gray-900 dark:text-white'>
                                            <li className='ml-7 py-1 font-semibold'>Population: <span className='font-thin'>{country.population}</span></li>
                                            <li className='ml-7 py-1 font-semibold'>Region: <span className='font-thin'>{country.region}</span></li>
                                            <li className='ml-7 py-1 font-semibold'>Capital: <span className='font-thin'>{country.capital}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </section>
    )
}

export default YourComponent;