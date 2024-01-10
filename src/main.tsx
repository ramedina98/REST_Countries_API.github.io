import React from 'react'
import { HashRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import Countries from './components/ListOfCountries.tsx'; 
import Country from './components/Country.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Countries />}></Route>
          <Route path="country/:id" element={<Country/>}></Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
