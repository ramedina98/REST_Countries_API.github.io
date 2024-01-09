import React, { useState } from 'react';//TODO: si no se usa elimnar
import useCountryData from '../hooks/useApiData';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const YourComponent: React.FC = () => {
    //function to search for a specific country...
    const { searchByCca3 } = useCountryData();
    //we get the id fromt the url...
    const { id } = useParams<{id:string}>();
    //we are looking for a specific country...
    const country = id ? searchByCca3(id):null;
    /*we get all the languages that int the country speak...
    TODO: terminar esta funcion...
    const languages = (languages:string) => {

    }*/

    console.log('Pais: ', country);

    return (
        <div className='py-4'>
            {/*this is the btn back...*/}
            <div className='py-4'>
                <Link to={'/'} className='bg-white py-3 w-backBtn rounded shadow-md flex items-center justify-center dark:bg-gray-800 dark:text-white'>
                    <i className='bx bx-arrow-back mr-2 text-xl font-semibold'></i> Back
                </Link>
            </div>
            {/*Here we have all the information about the country clicked */}
            {country ? (
                <div className='my-2 py-4 bg-red-200 flex items-center justify-between flex-row flex-wrap gap-4'>
                    <div className='w-bigFlag h-bigFlag'>
                        <img src={country.flags.png} 
                            alt={country.name.common}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-infoDiv h-bigFlag bg-blue-300 py-3'>
                        <div className='bg-green-200 py-2'>
                            <h3 className='font-bold text-tc text-white tracking-wide'>{country.name.common}</h3>
                        </div>
                        <div className='mt-5 w-all h-auto flex items-center justify-between'>
                            <ul className='w-1/2 h-auto bg-green-200'>
                                <li>Native Name: <span>{country.name.official}</span></li>
                                <li>Population: <span>{country.population}</span></li>
                                <li>Region: <span>{country.region}</span></li>
                                <li>Sub Region: <span>{country.subregion}</span></li>
                                <li>Capital: <span>{country.capital}</span></li>
                            </ul>
                            <ul className='w-1/2 h-auto bg-green-200'>
                                <li>Top Level Domain: <span>{country.tld[0]}</span></li>
                                <li>Currencies: <span>Moneda</span></li> {/*TODO: hay que hacer una funcion para resolver esto...*/}
                                <li>Languages: hey</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Error</div>
            )}
        </div>
    )
}

export default YourComponent;