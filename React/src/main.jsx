import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import useContext from "react";
import UsuarioProvider from "./Context/UsuarioProvider.jsx";
import ProcessamentoProvider from "./Context/ProcessamentoProvider.jsx";

createRoot(document.getElementById('root')).render(
  
  
    <ProcessamentoProvider>
      <UsuarioProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </UsuarioProvider>
    </ProcessamentoProvider>
    
  
  
)
