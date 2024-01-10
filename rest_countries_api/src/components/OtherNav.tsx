import '../css/index.css';
import React, { useState, useEffect } from 'react';

interface DataItem {
    id: number;
    name: string;
    items: string[];
}

const OtherNav: React.FC = () => {
const [data, setData] = useState<DataItem[]>([]);

const peticionGet = async () => {
    try {
        const response = await fetch("https://ramedina98.github.io/api_nat/dataBankLinks.json");
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const jsonData: DataItem[] = await response.json();
        setData(jsonData);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <>
            {data.map((item) => (
                <div className='contenedor' key={item.id}>
                    <div className='title'>
                        <h2>{item.name}</h2>
                    </div>
                        <div className='info'>
                            <ul>
                            {item.items.map((lis, index) => (
                                <li key={index}>{lis}</li>
                            ))}
                            </ul>
                        </div>
                </div>
            ))}
        </>
    );
};

export default OtherNav;