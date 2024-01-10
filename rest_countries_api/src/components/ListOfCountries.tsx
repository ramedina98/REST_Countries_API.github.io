import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountrySkeleton from './countrySkeleton';
import useCountryData from '../utils/useApiData';

//interface for country data...
interface CountryData {
    altSpellings: string[];
    area: number;
    borders: string[];
    capital: string[];
    cca2: string;
    cca3: string;
    ccn3: string;
    coatOfArms: { png: string; svg: string };
    continents: string[];
    currencies: { [key: string]: { name: string; symbol: string } };
    demonyms: { [key: string]: unknown };
    flag: string;
    flags: { png: string; svg: string };
    idd: { root: string; suffixes: string[] };
    independent: boolean;
    landlocked: boolean;
    languages: { [key: string]: string };
    latlng: number[];
    maps: { googleMaps: string; openStreetMaps: string };
    name: { common: string; official: string; nativeName: { [key: string]: { official: string; common: string } } };
    population: number;
    postalCode: { format: string; regex: string };
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: { [key: string]: { official: string; common: string } };
    unMember: boolean;
}

const YourComponent: React.FC = () => {
    //we consume the API of countries...
    const { data, loading, error } = useCountryData(); 

    //go to the top...
    const scrollToTop = () => {
        window.scrollTo(0,0);
    };
    //upward
    scrollToTop()
    
    //code needed to show and hide the drop menu...
    const [showMenu, setShowMenu] = useState(false);
    const toggleDropMenu = () => {
        setShowMenu(!showMenu)
    }
    //search for a country...
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<CountryData[]>([]);

    //we update the status of the search term...
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const results = data?.filter((country) =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results || []);
        } else {
            setSearchResults(data || []);
        }
    }, [searchTerm, data]);

    //this function recives the content that the user types in the input... 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }; 

    //we filter by country and region...
    const filteredCountries: CountryData[] = data ? data.filter((country: CountryData) => {
        const nameMatch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        const regionMatch = country.region.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || regionMatch;
    }) : [];

    //searh for a country by region...
    //this function detect which li tag clicked the user...
    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const clickedLi = event.target as HTMLLIElement;
        if(clickedLi.textContent !== null){
            setSearchTerm(clickedLi.textContent);
        } else{
            console.log('Text null');
        }
    };

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
                        onChange={handleSearch}
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
                            <li onClick={handleClick} className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Africa</li>
                            <li onClick={handleClick} className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>America</li>
                            <li onClick={handleClick} className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Asia</li>
                            <li onClick={handleClick} className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Europe</li>
                            <li onClick={handleClick} className='hover:bg-gray-100 w-all py-1 pl-2 cursor-pointer dark:hover:bg-gray-600'>Oceania</li>
                        </ul>
                    </div>
                )}
            </div>
            {/*the next part contains the carts that brings the flag and part of 
            the information of the countries...*/}
            <div className='py-6 flex items-center justify-center flex-wrap gap-9'>
                {/*we chech if searchTerm is empty or not...*/}
                {searchTerm === '' ? (
                    /*skeletons for data loading...*/
                    loading ? (
                        //we show 8 repetitions of the skeleton...
                        Array.from({ length: 8 }, (_, index) => <CountrySkeleton key={index} />)
                    ) : (
                        /*uploaded data... */
                        data && data.map((country:any) => (
                            <Link to={`/country/${country.cca3}`} key={country.cca3}>
                                <div className='bg-white dark:bg-gray-800 w-300 h-cartH rounded flex flex-col items-center justify-center shadow-sm cursor-pointer dark:border-gray-600'>
                                    <div className='w-all h-half dark:border-gray-700 border-gray-100 border-b shadow-sm'>
                                        <img src={country.flags.png}
                                            alt={country.name.common}
                                            className='w-full h-full object-contain'
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
                    )
                ) : (
                    //input search results...
                    filteredCountries.map((country: CountryData) => (
                        <Link to={`/country/${country.cca3}`} key={country.cca3}>
                            <div className='bg-white dark:bg-gray-800 w-300 h-cartH rounded flex flex-col items-center justify-center shadow-sm cursor-pointer dark:border-gray-600'>
                                <div className='w-all h-half dark:border-gray-700 border-gray-100 border-b shadow-sm'>
                                    <img src={country.flags.png}
                                        alt={country.name.common}
                                        className='w-full h-full object-contain'
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