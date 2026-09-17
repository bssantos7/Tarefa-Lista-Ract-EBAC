import { useState } from 'react'
import useContext from 'react'
import {usuarioContext} from './Context/UsuarioContext'
import TelaLogin from './Componentes/TelaLogin'

import Menu from './Componentes/Menu'


function App() {
  

  return (
    <>
      <div className="container-md">
        <div className="row">
          <div class="col">
            <Menu />
          </div>
        </div>
        <div className="row">
          <div class="col">
            <TelaLogin />
          </div>
        </div>  
      </div>
    </>
  )
}

export default App
