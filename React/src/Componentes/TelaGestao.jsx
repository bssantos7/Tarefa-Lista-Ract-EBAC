import { useContext } from "react";
import { UsuarioContext } from "../Context/UsuarioContext";
import { ProcessamentoContext } from "../Context/ProcessamentoContext";
import useApiFetch from "../Hooks/useApiFecth";
import { useState } from "react";

function TelaGestao() {

    
    const {carregando, setCarregando }=useContext(ProcessamentoContext);
    const {usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario, postUsuario, putUsuario}=useApiFetch();
    const [novaTarefa, setNovaTarefa]=useState('');

    function handleChange(evento){
        setNovaTarefa(evento.target.value);
    }

    async function handleSubmit(e){
       e.preventDefault();
       if(!usuario||!usuario._id){
            setMensagem("Usuario não localizado. faça o login primeiro");
            return;
       }else{
            const tarefaNova=novaTarefa.trim();
            if(!tarefaNova){
                setMensagem("O campo da nova tarefa não pode ser vazio!");
                return;
            }else{
                const usuarioAtualizado={...usuario, tarefas:[...(usuario.tarefas||[]),tarefaNova]};
                setUsuario(usuarioAtualizado);
                await putUsuario(usuarioAtualizado);
                setNovaTarefa("");
            }
       }
    }
    
    return (
        <div>
            <h1>Tela de Gestão</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="novaTarefa" className="form-label">Nova Tarefa: </label>
                    <input type="text" className="form-control" id="novaTarefa" name="novaTarefa" 
                    value={novaTarefa} onChange={handleChange} placeholder="Digite uma nova tarefa" required />
                </div>
                
                <button type="submit" className="btn btn-primary">{carregando?"Carregando...":"Entrar"}</button>
            </form>
            <div>
                <p>nome:{usuario.nome}</p>
                <ul>
                   {usuario.tarefas.map((tarefa)=>{return(<li key={tarefa}>{tarefa} </li>)})}
                </ul>
            </div>
        </div>
    )
}
export default TelaGestao;