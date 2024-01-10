import React, { useState, useEffect } from 'react';//TODO: si no se usa elimnar
import useCountryData from '../utils/useApiData';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../utils/scrollToTop.tsx';
import CountryInfoSkeleton from './infoCountrySkeleton.tsx';

const YourComponent: React.FC = () => {
    //to the top...
    ScrollToTopOnMount();
    const navigate = useNavigate();
    //go back btn function...
    const handleGoBack = () => {
        navigate(-1);
    }

    const [currencyNames, setCurrencyNames] = useState<string[]>([]);
    const [laguages, setLagagues] = useState<string[]>([]);
    
    //function to search for a specific country...
    const { searchByCca3, loading, error } = useCountryData();
    //we get the id fromt the url...
    const { id } = useParams<{id:string}>();
    //we are looking for a specific country...
    const country = id ? searchByCca3(id):null;
    //this is function helps us to better obtain the information about the currency or currencies used in the country...
    useEffect(() => {
        if (country?.currencies) {
            const currencyKeys = Object.keys(country?.currencies);
            const names = currencyKeys.map((currencyKey) => {
                const currency = country?.currencies[currencyKey];
            return currency.name;
        });
            setCurrencyNames(names);
        }
    }, [country?.currencies]);
    //Laguages...
    useEffect(() => {
        if (country?.languages) {
            const laguageKeys = Object.keys(country?.languages);
            const laguages = laguageKeys.map((laguageKeys) => {
                const l = country?.languages[laguageKeys];
            return l;
        });
            setLagagues(laguages);
        }
    }, [country?.languages]);
    //format the array to be a string...
    const formatString = (name:string[]): string => {
        return name.join(', ');
    }
    /*we render and add a <li></li> with the name of each cuntry that has border with the clicked
    country...*/
    const renderBorderCountries = (borders: string[] | undefined): JSX.Element[] => {
        if (!borders) {
            return []; // If borders undefined we return an empty array...
        }

        return borders.map((border, index) => (
            <Link to={`/country/${border}`} key={index}>
                <li className='ml-2 border-gray-300 bg-white rounded shadow-sm py-1 px-8 tracking-wide text-gray-900 dark:bg-gray-800 dark:text-white'>
                    {border}
                </li>
            </Link>
        ));
    };

    //if we have an error we return it here...
    if(error){
        return <div>Error: {error}</div>;
    }

    return (
        <div className='py-4'>
            {/*this is the btn back...*/}
            <div className='py-4'>
                <button onClick={handleGoBack} className='bg-white py-3 w-backBtn rounded shadow-md flex items-center justify-center dark:bg-gray-800 dark:text-white'>
                    <i className='bx bx-arrow-back mr-2 text-xl font-semibold'></i> Back
                </button>
            </div>
            {/*Here we have all the information about the country clicked */}
            {loading ? (
                <CountryInfoSkeleton/>
            ) : (
                <div className='my-2 py-4 flex items-center justify-between flex-row flex-wrap gap-4'>
                    <div className='w-all h-bigFlag 635:w-bigFlag'>
                        <img src={country?.flags.png} 
                            alt={country?.name.common}
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <div className='w-infoDiv h-auto py-3 flex items-start justify-around flex-col 635:h-bigFlag'>
                        <div className='py-2 w-all'>
                            <h3 className='font-bold text-tc text-left text-gray-900 tracking-wide dark:text-white'>{country?.name.common}</h3>
                        </div>
                        <div className='mt-5 w-all h-auto flex items-center justify-between flex-wrap gap-1'>
                            <ul className='w-list h-auto dark:text-whitepy-2'>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Native Name: <span className='font-normal'>{country?.name.official}</span></li>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Population: <span className='font-normal'>{country?.population}</span></li>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Region: <span className='font-normal'>{country?.region}</span></li>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Sub Region: <span className='font-normal'>{country?.subregion}</span></li>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Capital: <span className='font-normal'>{country?.capital}</span></li>
                            </ul>
                            <ul className='w-list h-auto py-2'>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Top Level Domain: <span className='font-normal'>{country?.tld[0]}</span></li>
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Currencies: <span className='font-normal'>{formatString(currencyNames)}</span></li> 
                                <li className='py-2 font-semibold text-l text-gray-900 dark:text-white'>Languages: <span className='font-normal'>{formatString(laguages)}</span></li>
                            </ul>
                        </div>
                        <div className='w-all h-auto py-3 flex items-center justify-center '>
                            <div className='w-1/5 py-4'>
                                <p className='text-gray-900 dark:text-white font-semibold text-l'>Border Countries: </p>
                            </div>
                            <ul className='w-4/5 h-auto flex items-center justify-start flex-wrap gap-3'>
                                {renderBorderCountries(country?.borders)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default YourComponent;