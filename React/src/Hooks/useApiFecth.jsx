import useContext from "react";
import useState from "react";
import useRef from "react";
import UsuarioProvider from "../Context/UsuarioProvider";
import ProcessamentoProvider from "../Context/ProcessamentoProvider";

function useApiFetch(id) {
    const {usuario, setUsuario} = useContext(UsuarioProvider);
    const [novoUsuario, setNovoUsuario] = useState({_id:'', nome: '', tarefase: []});
    const {statusProcessamento, carregando, setCarregando} = useContext(ProcessamentoProvider);
    const url = `https://crudcrud.com/api/3b27f9956b53432eab63de0b681e9843/ToDoList/${id}`;
    const [mensagem, setMensagem] = useState('');

    async function getUsuario() {
        if(statusProcessamento.current === 'ocupado'){
            setMensagem('Processamento em andamento, aguarde...');
            return;
        }else{
            statusProcessamento.current = 'ocupado';
            setCarregando(true);
            try {
                const resposta=await fetch(url);
                if(!resposta.ok){
                    throw new Error('Erro ao buscar usuário - ${resposta.status}');
                }else{
                    const dados=await resposta.json();
                    setUsuario(dados);
                    setMensagem('Usuário carregado com sucesso - ${resposta.status}');
                }
            } catch (error) {
                setMensagem('Erro ao buscar usuário - ${error.message}');
            }finally{
                setCarregando(false);
                statusProcessamento.current = 'livre';
            }
        }
    }
    return{usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario};
}
export default useApiFetch;