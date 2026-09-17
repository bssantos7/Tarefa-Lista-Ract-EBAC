import { useState } from 'react'
import useContext from 'react'
import { UsuarioContext } from './Componentes/UsuarioContext'

import Menu from './Componentes/Menu'


function App() {
  

  return (
    <>
      <div className="container container-md">
        <div className="row">
          <div class="col">
            <Menu />
          </div>
        </div>
        <div className="row">
          <div class="col">
            <p>área principal</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
