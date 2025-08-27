import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import { BgProvider } from './contexts/bgColorContext';
import "./i18n"; 
import { ChangeLanguageProvider } from './contexts/changeLanguageContext';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        
          <ChangeLanguageProvider>
            <BgProvider>
              <RoutesApp/>
              <ToastContainer  style={{ zIndex: 99999}}/>
            </BgProvider>
          </ChangeLanguageProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
