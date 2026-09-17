import {useContext} from "react";
import {useState} from "react";
import {useRef} from "react";
import {UsuarioProvider} from "../Context/UsuarioProvider";
import {ProcessamentoProvider} from "../Context/ProcessamentoProvider";
import {UsuarioContext} from "../Context/UsuarioContext";
import {ProcessamentoContext} from "../Context/ProcessamentoContext";

function useApiFetch(id) {
    const {usuario, setUsuario} = useContext(UsuarioContext);
    const [novoUsuario, setNovoUsuario] = useState({nome: '', tarefase: []});
    const {statusProcessamento, carregando, setCarregando} = useContext(ProcessamentoContext);
    const url = "https://crudcrud.com/api/1186793ad8ce49d58cc1296b4ebc5c15/ToDoList";
    const [mensagem, setMensagem] = useState('');

    async function getUsuario() {
        if(statusProcessamento.current === 'ocupado'){
            setMensagem('Processamento em andamento, aguarde...');
            return;
        }else{
            statusProcessamento.current = 'ocupado';
            setCarregando(true);
            try {
                const resposta=await fetch(`${url}/${id}`);
                if(!resposta.ok){
                    throw new Error(`Erro ao buscar usuário - ${resposta.status}`);
                }else{
                    const dados=await resposta.json();
                    setUsuario(dados);
                    setMensagem(`Usuário carregado com sucesso - ${resposta.status}`);
                }
            } catch (error) {
                setMensagem(`Erro ao buscar usuário - ${error.message}`);
            }finally{
                setCarregando(false);
                statusProcessamento.current = 'livre';
            }
        }
    }
    return{usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario};
}
export default useApiFetch;