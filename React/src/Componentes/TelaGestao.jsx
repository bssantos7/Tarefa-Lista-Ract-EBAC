import { useContext } from "react";
import { UsuarioContext } from "../Context/UsuarioContext";
import { ProcessamentoContext } from "../Context/ProcessamentoContext";
import useApiFetch from "../Hooks/useApiFecth";
import { useState } from "react";
import { useEffect } from "react";

function TelaGestao() {

    const {carregando, setCarregando }=useContext(ProcessamentoContext);
    const {usuario, setUsuario, novoUsuario, setNovoUsuario, mensagem, setMensagem, getUsuario, postUsuario, putUsuario}=useApiFetch();
    const [novaTarefa, setNovaTarefa]=useState({cod:'', texto:''});
    const [digito, setDigito]=useState(0);

    function geraCodigoTarefa(){
        if(!usuario._id){
            return;
        }else{
            const digitoVerificador=digito+1;
            const codigo=`${usuario._id}/${digitoVerificador}`;
            setNovaTarefa((tarefaAnterior)=>({...tarefaAnterior,cod:codigo}));
        }
    }

    useEffect(()=>{
        if(usuario?.id){
            geraCodigoTarefa();
        }
    },[usuario,digito]);


    function preencheTabela(){
        const dono=usuario;
        {dono.tarefas.map((tarefa)=>{return(
                            <>
                            <th scope="row" key={tarefa.cod}>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                                </div>
                            </th>
                            <td>{tarefa.cod}</td>
                            <td>{tarefa.nome}</td>
                            <td> <button type="submit" className="btn btn-danger">Excluir</button></td> 
                            </>
                            )})}
    }


    function handleChange(evento){
        const {name, value}=evento.target;
        setNovaTarefa((tarefaAnterior)=>({
            ...tarefaAnterior, [name]:value
        }));
    }

    async function handleSubmit(e){
       e.preventDefault();
       if(!usuario||!usuario._id){
            setMensagem("Usuario não localizado. faça o login primeiro");
            return;
       }else{
            const tarefaNova=novaTarefa;
            if(tarefaNova.texto.trim()===""){
                setMensagem("O campo da nova tarefa não pode ser vazio!");
                return;
            }else{
                
                const usuarioAtualizado={...usuario, tarefas:[...(usuario.tarefas||[]),tarefaNova]};
                setUsuario(usuarioAtualizado);
                await putUsuario(usuarioAtualizado);
                const numero=digito;
                setDigito((digitoAnteior)=>digitoAnteior+1);
                setNovaTarefa({
                    cod:'',
                    texto:''
                });
            }
       }
    }
    
    return (
        <div>
            <h1>Tela de Gestão</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="novaTarefa" className="form-label">Nova Tarefa: </label>
                    <input type="text" className="form-control" id="texto" name="texto" 
                    value={novaTarefa.texto} onChange={handleChange} placeholder="Digite uma nova tarefa" required />

                    <input className="form-control" id="cod" type="text" placeholder="Código da Tarefa Gerado automaticamente" disabled value={novaTarefa.cod} onChange={handleChange}></input>
                    
                </div>
                
                <button type="submit" className="btn btn-primary">{carregando?"Carregando...":"Entrar"}</button>
            </form>
            <div>
                <p>nome:{usuario.nome}</p>
                <ul>
                   
                </ul>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Feito?</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Tarefa</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.tarefa.map((tarefa)=>(
                       <tr key={tarefa.cod}>
                            <th scope="row">
                                 <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`check-${tarefa.cod}`}
                                    />
                                </div>
                            </th>
                            <td>
                                {tarefa.cod}
                            </td>
                            <td>
                                {tarefa.textp}
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger"
                                >Excluir
                                </button>
                            </td>
                       </tr> 
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default TelaGestao;