/*here we have to buil all the main structure 
of the app...*/
//import { useState } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Countries from './components/ListOfCountries.tsx'; 
import Country from './components/Country.tsx';
import { useEffect, useState } from 'react';

function App() {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const htmElement = document.querySelector('html');

    if(htmElement){
      if(isDark){
        htmElement.classList.add('dark');
      } else{
        htmElement.classList.remove('dark');
      }
    } else{
      htmElement!.classList.remove('dark');
    }
  }, [isDark])

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  }

  return (
    <>
      <header className='bg-white py-5 shadow-md dark:bg-gray-800 flex items-center justify-between'>
        {/*main title of the page... */}
        <div className='ml-3 py-3 px-3'>
          <h1 className='text-gray-900 text-2xl font-bold dark:text-white'>
            Where in the world?
          </h1>
        </div>
        {/*Here we have the button that change switches between leght and dark mode...*/}
        <div className='mr-2 p-3 flex items-center justify-between'>
          <button className='text-gray-900 text-l font-semibold py-1 px-5 dark:text-white'
                  onClick={toggleDarkMode}
          >
            {isDark ? (
              <>
                <i className='bx bx-sun'></i> Light Mode
              </>
            ): 
              <>
                <i className='bx bx-moon'></i> Dark Mode
              </>
            }
          </button>
        </div>
      </header>
      {/*Here are the two main components...*/}
      <main className='bg-gray-100 py-5 px-4 dark:bg-gray-700'>
        <Router>
          <Routes>
            <Route path='/' element={<Countries/>}/>
            <Route path='/country/:id' element={<Country/>}/>
          </Routes>
        </Router>
      </main>
      {/*every page needs its footer*/}
      {/*TODO: Hay que buscar si hay recursos en internet para ver y desarrollar
      un muy buen footer para esta pagina...*/}
      <footer className='p-5'>
        <h2 className='text-center'>Ricardo Abraham Medina Martin Del Campo</h2>
      </footer>
    </>
  )
}

export default App
