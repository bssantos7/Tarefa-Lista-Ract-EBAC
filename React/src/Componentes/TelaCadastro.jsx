import { useContext } from "react";
import useApiFetch from "../Hooks/useApiFecth";
import { useState } from "react";
import { ProcessamentoContext } from "../Context/ProcessamentoContext"; 

function TelaCadastro() {

    const [nome, setNome] = useState('');
    const {usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario, postUsuario} = useApiFetch();
    const { statusProcessamento, carregando, setCarregando }=useContext(ProcessamentoContext);

    function handleChange(evento) {
        const{name, value}=evento.target

        setNovoUsuario((usuarioAnterior)=>({
            ...usuarioAnterior, [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(novoUsuario.nome.trim() === ''){
            setMensagem('O campo nome é obrigatório.');
            return;
        }else{
            await postUsuario(novoUsuario);
        }
    }

    return (
        <div>
            <h1>Tela de Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome: </label>
                    <input type="text" className="form-control" id="nome" name="nome" 
                    value={novoUsuario.nome} onChange={handleChange} placeholder="Digite o nome do usuário" required />
                </div>
                
                <button type="submit" className="btn btn-primary">{carregando?"Carregando...":"Entrar"}</button>
            </form>
            <div>
                <p>Mensagem do sistema: {mensagem}</p>
            </div>
        </div>
    )
}
export default TelaCadastro;