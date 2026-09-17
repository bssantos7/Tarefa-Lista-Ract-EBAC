import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import useContext from 'react'
import UsuarioProvider from "./Context/UsuarioProvider.jsx";
import ProcessamentoProvider from "./Context/ProcessamentoProvider.jsx";
import PaginaProvider from "./Context/PaginaProvider.jsx";

createRoot(document.getElementById('root')).render(
  
  <PaginaProvider>
    <ProcessamentoProvider>
      <UsuarioProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </UsuarioProvider>
    </ProcessamentoProvider>
  </PaginaProvider>
  
)
