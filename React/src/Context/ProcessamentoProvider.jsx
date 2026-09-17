import {useContext} from 'react'
import {useState} from 'react'
import {ProcessamentoContext} from './ProcessamentoContext'
import {useRef} from 'react'

function ProcessamentoProvider({children}) {
    // o useRef alterna entre livre e ocupado, serve para controlar a execução do fetch e impedir que chame várias vezes o processo. a mudança não causa re-render, então não precisa de useState.
    const statusProcessamento =useRef('livre');
    //o usestate carregando é usado para mostrar na tela dos compoentes que fazem o fetch api
    const [carregando, setCarregando] = useState(false);

    return (
        <ProcessamentoContext.Provider value={{ statusProcessamento, carregando, setCarregando }}>
            {children}
        </ProcessamentoContext.Provider>
    )
}
export default ProcessamentoProvider;
