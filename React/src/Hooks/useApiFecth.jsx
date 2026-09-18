import {useContext} from "react";
import {useState} from "react";
import {useRef} from "react";

import {UsuarioContext} from "../Context/UsuarioContext";
import {ProcessamentoContext} from "../Context/ProcessamentoContext";

function useApiFetch() {
    const {usuario, setUsuario} = useContext(UsuarioContext);
    const [novoUsuario, setNovoUsuario] = useState({nome: '', tarefas: []});
    const {statusProcessamento, carregando, setCarregando} = useContext(ProcessamentoContext);
    const url = 'https://crudcrud.com/api/1186793ad8ce49d58cc1296b4ebc5c15/ToDoList';
    const [mensagem, setMensagem] = useState('');

    async function getUsuario(id) {
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
                setMensagem(`Erro ao buscar usuário - ${error.message} -`);
            }finally{
                setCarregando(false);
                statusProcessamento.current = 'livre';
            }
        }
    }

    async function postUsuario(novoUsuario) {
        if(statusProcessamento.current === 'ocupado'){
            setMensagem('Processamento em andamento, aguarde...');
            return;
        }else{
            statusProcessamento.current = 'ocupado';
            setCarregando(true);
           try {
                const resposta=await fetch(url,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(novoUsuario)});
                if(!resposta.ok){
                    throw new Error(`Erro ao cadastrar usuário - ${resposta.status}`);
                }else{
                    const dados= await resposta.json();
                    setMensagem(`ID do usuario cadastrado: ${dados._id}`);
                }
           } catch (error) {
                setMensagem(`Erro ao cadastrar ususário - ${error.message}`);
           }finally{
                setCarregando(false);
                statusProcessamento.current='livre';
           }
        }
    }

    async function putUsuario(usuarioParaAtualizar) {
    if (statusProcessamento.current === 'ocupado') {
        setMensagem('Processamento em andamento, aguarde...');
        return false;
    }

    statusProcessamento.current = 'ocupado';
    setCarregando(true);

    try {
        const { _id, ...usuarioSemId } = usuarioParaAtualizar;

        const resposta = await fetch(`${url}/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioSemId)
        });

        if (!resposta.ok) {
            throw new Error(
                `Erro ao atualizar o usuário - ${resposta.status}`
            );
        }

        setMensagem('Usuário atualizado com sucesso.');
        return true;

    } catch (error) {
        setMensagem(`Erro ao atualizar usuário: ${error.message}`);
        return false;

    } finally {
        setCarregando(false);
        statusProcessamento.current = 'livre';
    }
}

    return{usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario, postUsuario, putUsuario};
}
export default useApiFetch;