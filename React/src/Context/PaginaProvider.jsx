import {useContext} from 'react';
import {useState} from 'react';
import PaginaContext from './PaginaContext';


function PaginaProvider({children}){
    const[paginaAtual, setPaginaAtual]=useState('login');

    return(
        <PaginaContext.Provider value={{paginaAtual, setPaginaAtual}}>
            {children}
        </PaginaContext.Provider>
    )
}
export default PaginaProvider;