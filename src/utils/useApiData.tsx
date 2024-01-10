import { useState, useEffect } from "react";

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

//TODO: ver como se utiliza el loading y error...

const useCountryData = () => {
    const [data, setData] = useState<CountryData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //here we get all the data from the api...
    async function fetcData(){
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError('Error when obtaining data');
        } finally{
            setLoading(false);
        }
    }
    //
    useEffect(() => {
        fetcData();
    }, []);
    //here we get a specific country...
    const searchByCca3 = (code: string):CountryData | undefined => {
        if(!data) return undefined;
        return data.find((country: CountryData) => country.cca3.toUpperCase() === code);
    }
    
    return { data, loading, error, searchByCca3 };
};

export default useCountryData;