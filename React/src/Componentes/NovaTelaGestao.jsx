import { useContext, useEffect, useState } from "react";
import { ProcessamentoContext } from "../Context/ProcessamentoContext";
import useApiFetch from "../Hooks/useApiFecth";

function gerarCodigoTarefa(usuarioId) {
    return `${usuarioId}/${crypto.randomUUID()}`;
}

function NovaTelaGestao() {
    const { carregando } = useContext(ProcessamentoContext);

    const {
        usuario,
        setUsuario,
        mensagem,
        setMensagem,
        putUsuario
    } = useApiFetch();

    const [textoNovaTarefa, setTextoNovaTarefa] = useState("");
    const [codigoNovaTarefa, setCodigoNovaTarefa] = useState("");

    /*
      Este effect é útil apenas para preparar o código da próxima tarefa
      quando o usuário for carregado ou trocado.
    */
    useEffect(() => {
        if (usuario?._id) {
            setCodigoNovaTarefa(gerarCodigoTarefa(usuario._id));
        } else {
            setCodigoNovaTarefa("");
        }
    }, [usuario?._id]);

    function handleChange(evento) {
        setTextoNovaTarefa(evento.target.value);
    }

    async function handleSubmit(evento) {
        evento.preventDefault();

        if (!usuario?._id) {
            setMensagem("Usuário não localizado. Faça login primeiro.");
            return;
        }

        const texto = textoNovaTarefa.trim();

        if (!texto) {
            setMensagem("O campo da nova tarefa não pode ser vazio.");
            return;
        }

        const tarefa = {
            cod: codigoNovaTarefa,
            texto
        };

        const usuarioAtualizado = {
            ...usuario,
            tarefas: [
                ...(usuario.tarefas || []),
                tarefa
            ]
        };

        /*
          Primeiro salva na API.
          Só atualiza o Context se a API confirmou o sucesso.
        */
        const atualizou = await putUsuario(usuarioAtualizado);

        if (!atualizou) {
            return;
        }

        /*
          Esta alteração no Context provoca automaticamente
          uma nova renderização da tabela.
        */
        setUsuario(usuarioAtualizado);

        setTextoNovaTarefa("");
        setCodigoNovaTarefa(gerarCodigoTarefa(usuario._id));
    }

    async function handleExcluir(codigoTarefa) {
        if (!usuario?._id) {
            setMensagem("Usuário não localizado.");
            return;
        }

        const tarefasAtualizadas = (usuario.tarefas || []).filter(
            (tarefa) => tarefa.cod !== codigoTarefa
        );

        const usuarioAtualizado = {
            ...usuario,
            tarefas: tarefasAtualizadas
        };

        const atualizou = await putUsuario(usuarioAtualizado);

        if (!atualizou) {
            return;
        }

        /*
          Após atualizar o Context, o map da tabela será executado
          novamente sem precisar de useEffect.
        */
        setUsuario(usuarioAtualizado);
    }

    return (
        <div>
            <h1>Tela de Gestão</h1>

            {mensagem && (
                <div className="alert alert-info" role="alert">
                    {mensagem}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="texto" className="form-label">
                        Nova tarefa:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="texto"
                        name="texto"
                        value={textoNovaTarefa}
                        onChange={handleChange}
                        placeholder="Digite uma nova tarefa"
                        disabled={carregando || !usuario?._id}
                        required
                    />

                    <label htmlFor="cod" className="form-label mt-2">
                        Código gerado:
                    </label>

                    <input
                        className="form-control"
                        id="cod"
                        type="text"
                        disabled
                        value={codigoNovaTarefa}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={carregando || !usuario?._id}
                >
                    {carregando ? "Carregando..." : "Cadastrar tarefa"}
                </button>
            </form>

            <div className="mt-4">
                <p>
                    <strong>Nome:</strong> {usuario?.nome}
                </p>
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
                    {(usuario?.tarefas || []).map((tarefa) => (
                        <tr key={tarefa.cod}>
                            <td>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`check-${tarefa.cod}`}
                                    />
                                </div>
                            </td>

                            <td>{tarefa.cod}</td>

                            <td>{tarefa.texto}</td>

                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    disabled={carregando}
                                    onClick={() =>
                                        handleExcluir(tarefa.cod)
                                    }
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}

                    {!usuario?.tarefas?.length && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Nenhuma tarefa cadastrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default NovaTelaGestao;
