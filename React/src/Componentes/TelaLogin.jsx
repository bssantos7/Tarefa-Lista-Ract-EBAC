import useContext from 'react';
import { UsuarioContext } from './Componentes/UsuarioContext';
import useApiFetch from '../Hooks/useApiFecth';
import useState from 'react';
import ProcessamentoProvider from '../Context/ProcessamentoProvider';

function TelaLogin() {
    
    const {usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario} = useApiFetch();
    const [idUsuario, setIdUsuario] = useState('');
    const { statusProcessamento, carregando, setCarregando }= useContext(ProcessamentoProvider);

    function handleChange(){}
    
    function handleSubmit(){}

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">ID: </label>
                    <input type="text" className="form-control" id="id" name="id" value={usuario.id} onChange={handleChange} placeholder="Digite o ID do usuário" />
                </div>
                
                <button type="submit" className="btn btn-primary">{carregando?"Carregando...":"Entrar"}</button>
            </form>
            <div>
                <p>Mensagem do Sistema:{mensagem}</p>
                <p>Sistema Processando?: {carregando}</p>
                <p>Usuario Logado:{`Nome:${usuario.nome}`}</p>
            </div>
        </div>
    )
}
export default TelaLogin;