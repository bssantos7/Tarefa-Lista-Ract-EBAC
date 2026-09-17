import { useState } from 'react'
import {useContext} from 'react'
import {UsuarioContext} from './Context/UsuarioContext'
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
            <p>Bem-vindo ao sistema de gerenciamento de tarefas. Faça login para acessar suas tarefas.</p>
            <TelaLogin />
          </div>
        </div>  
      </div>
    </>
  )
}

export default App
