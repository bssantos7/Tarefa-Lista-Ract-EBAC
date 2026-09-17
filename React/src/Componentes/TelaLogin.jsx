import {useContext} from 'react';
import {UsuarioContext} from '../Context/UsuarioContext';
import useApiFetch from '../Hooks/useApiFecth';
import {useState} from 'react';
import ProcessamentoProvider from '../Context/ProcessamentoProvider';
import {ProcessamentoContext} from '../Context/ProcessamentoContext';

function TelaLogin() {
    
    const {usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario} = useApiFetch();
    const [id, setId] = useState('');
    const { statusProcessamento, carregando, setCarregando }= useContext(ProcessamentoContext);

    function handleChange(e){
        setId(e.target.value);
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        await getUsuario(id);
    }

    return(
        <div>
            <h1>Tela de Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID: </label>
                    <input type="text" className="form-control" id="id" name="id" value={id} onChange={handleChange} placeholder="Digite o ID do CRUDCRUD" />
                </div>
                
                <button type="submit" className="btn btn-primary">{carregando?"Carregando...":"Entrar"}</button>
            </form>
            <div>
                <p>Mensagem do Sistema:{mensagem}</p>
                <p>Sistema Processando?: {carregando}</p>
                <p>Usuario Logado: {usuario ? `Nome: ${usuario.nome}` : "Nenhum usuário"}</p>
            </div>
        </div>
    )
}
export default TelaLogin;