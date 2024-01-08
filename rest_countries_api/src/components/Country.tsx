import React, { useState } from 'react';//TODO: si no se usa elimnar
import useCountryData from '../hooks/useApiData';
import { useParams } from 'react-router-dom';

const YourComponent: React.FC = () => {
    //function to search for a specific country...
    const { searchByCca3 } = useCountryData();
    //we get the id fromt the url...
    const { id } = useParams<{id:string}>();
    //we are looking for a specific country...
    const country = id ? searchByCca3(id):null;

    return (
        <div>
            <h1 className='text-center text-red-400'>{country?.name.common}</h1>
        </div>
    )
}

export default YourComponent;