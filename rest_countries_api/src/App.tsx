/*here we have to buil all the main structure 
of the app...*/
//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import Countries from './components/ListOfCountries.tsx'; 
import Country from './components/Country.tsx';
import OtherNav from './components/OtherNav.tsx';
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
      <footer>
        <div className='cont_cards_nav'>
          <OtherNav/>
        </div>
        <div className='cont_redes_legal_terms'>
          <div className='redesNterms'>
            <div className='legal'>
              <p>
                <span>Where in the world?</span> © 2023 Where in the world? México S.A. de C.V., SFP (WITW Mexico) is a educational institution. 
                C.V., SFP (WITW Mexico) is a educational institution authorized and supervised by the National 
                authorized and supervised by the National SEP and 
                educational and SEP Commission and other educational authorities, 
                under the education Law.
              </p>
            </div>
            <div className='redes'>
              <ul>
                <li><a href='#'><i className="fab fa-facebook"></i></a></li>
                <li><a href='https://instagram.com/richard_b_stone?utm_source=qr' target='_blank'><i className="fab fa-instagram"></i></a></li>
                <li><a href='https://www.linkedin.com/in/ricardo-abraham-medina-marti-del-campo-8baa7827a/' target='_blank'><i className="fab fa-linkedin"></i></a></li>
                <li><a href='#'><i className="fab fa-twitter"></i></a></li>
                <li><a href='#'><i className="fab fa-youtube"></i></a></li>
                <li><a href='#'><i className="fab fa-tiktok"></i></a></li>
              </ul>
            </div>
          </div>
          <div className='termsNmore'>
            <div className='address'>
              <p>Where in the world? México education S.A. de C.V. S.F.P. Ave. 
                Presidente Masaryk No. 111, 7th Floor, Col. 
                IV Sección, CP 11550, Miguel Hidalgo, CDMX.
              </p>
            </div>
            <div className='other_things'>
              <ul>
                <li>Costs and commissions</li>
                <li>Contracts</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
