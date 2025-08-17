import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import { BgProvider } from './contexts/bgColorContext';
import "./i18n"; 
import { ChangeLanguageProvider } from './contexts/changeLanguageContext';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        
          <ChangeLanguageProvider>
            <BgProvider>
              <RoutesApp/>
            </BgProvider>
          </ChangeLanguageProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
