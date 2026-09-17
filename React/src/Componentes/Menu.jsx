import {useContext} from 'react';

import {UsuarioContext} from '../Context/UsuarioContext';

function Menu() {

    
    const{usuario, setUsuario} = useContext(UsuarioContext);
    
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">ToDo List System</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Login</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Cadastro</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Gestão</a>
                </li>
            </ul>
            <span className="navbar-text">
                {usuario ? `Bem-vindo, ${usuario.nome}` : "Usuário não logado"}
            </span>
            </div>
        </div>
    </nav>
  );
}