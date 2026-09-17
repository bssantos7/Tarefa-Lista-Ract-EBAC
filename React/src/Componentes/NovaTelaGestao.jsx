import { useContext } from "react";
import { UsuarioContext } from "../Context/UsuarioContext";
import { ProcessamentoContext } from "../Context/ProcessamentoContext";
import useApiFetch from "../Hooks/useApiFecth";
import { useState } from "react";
import { useEffect } from "react";

function NovaTelaGestao() {

    const { carregando } = useContext(ProcessamentoContext);

    const {
        usuario,
        setUsuario,
        mensagem,
        setMensagem,
        putUsuario
    } = useApiFetch();

    const [novaTarefa, setNovaTarefa] = useState({
        cod: '',
        texto: ''
    });

    const [digito, setDigito] = useState(0);


    function geraCodigoTarefa() {

        if (!usuario?._id) {
            return;
        }

        const digitoVerificador = digito + 1;
        const codigo = `${usuario._id}/${digitoVerificador}`;

        setNovaTarefa((tarefaAnterior) => ({
            ...tarefaAnterior,
            cod: codigo
        }));
    }


    useEffect(() => {

        if (usuario?._id) {
            geraCodigoTarefa();
        }

    }, [usuario, digito]);


    function handleChange(evento) {

        const { name, value } = evento.target;

        setNovaTarefa((tarefaAnterior) => ({
            ...tarefaAnterior,
            [name]: value
        }));

    }


    async function handleSubmit(e) {

        e.preventDefault();

        if (!usuario?._id) {

            setMensagem(
                "Usuario não localizado. Faça o login primeiro."
            );

            return;
        }

        if (novaTarefa.texto.trim() === "") {

            setMensagem(
                "O campo da nova tarefa não pode ser vazio!"
            );

            return;
        }


        const usuarioAtualizado = {
            ...usuario,
            tarefas: [
                ...(usuario.tarefas || []),
                novaTarefa
            ]
        };


        setUsuario(usuarioAtualizado);

        await putUsuario(usuarioAtualizado);


        setDigito((numeroAnterior) => numeroAnterior + 1);

        setNovaTarefa({
            cod: '',
            texto: ''
        });
    }


    return (
        <div>

            <h1>Tela de Gestão</h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label
                        htmlFor="texto"
                        className="form-label"
                    >
                        Nova Tarefa:
                    </label>


                    <input
                        type="text"
                        className="form-control"
                        id="texto"
                        name="texto"
                        value={novaTarefa.texto}
                        onChange={handleChange}
                        placeholder="Digite uma nova tarefa"
                        required
                    />


                    <input
                        className="form-control"
                        id="cod"
                        type="text"
                        placeholder="Código da Tarefa Gerado automaticamente"
                        disabled
                        value={novaTarefa.cod}
                    />

                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {carregando ? "Carregando..." : "Cadastrar tarefa"}
                </button>

            </form>


            <div>

                <p>Nome: {usuario?.nome}</p>

            </div>


            <table className="table">

                <thead>

                    <tr>
                        <th scope="col">Feito?</th>
                        <th scope="col">Código</th>
                        <th scope="col">Tarefa</th>
                        <th scope="col">Excluir</th>
                    </tr>

                </thead>


                <tbody>

                    {usuario?.tarefas?.map((tarefa) => (

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
                                {tarefa.texto}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}
export default NovaTelaGestao;