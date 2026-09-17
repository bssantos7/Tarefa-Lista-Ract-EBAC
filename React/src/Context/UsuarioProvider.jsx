import {useContext} from "react";
import {UsuarioContext} from "./UsuarioContext";
import {useState} from "react";

function UsuarioProvider({children}) {

    const [usuario, setUsuario] = useState(null);

    return(
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}
export default UsuarioProvider;