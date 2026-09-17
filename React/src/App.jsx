import { useState } from 'react'
import {useContext} from 'react'
import {UsuarioContext} from './Context/UsuarioContext'
import PaginaContext from './Context/PaginaContext'
import TelaLogin from './Componentes/TelaLogin'
import Menu from './Componentes/Menu'
import TelaCadastro from './Componentes/TelaCadastro'
import TelaGestao from './Componentes/TelaGestao'



function App() {
  const{paginaAtual, setPaginaAtual} = useContext(PaginaContext);

  function renderizarTela(){
    switch(paginaAtual){
      case 'login':
        return <TelaLogin />
      case 'cadastro':
        return <TelaCadastro />
      case 'gestao':
        return <TelaGestao />
      default:
        return <TelaLogin />
    }
  }

  return (
    <>
      <div className="container-md">
        <div className="row">
          <div class="col">
            <Menu />
          </div>
        </div>
        <div className="row">
          {renderizarTela()}
        </div>  
      </div>
    </>
  )
}

export default App
