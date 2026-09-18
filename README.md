# ToDo List - React
## Objetivo:
O projeto tem por objetivo implementar uma lista de tarefas individual para cada usuário do sistema.   
Para esse objetivo utilizei a API da CRUDCRUD para persistir os dados que pode ser acessado através do link https://crudcrud.com/api/1186793ad8ce49d58cc1296b4ebc5c15/ToDoList.  
O Json possui a seguinte estrutura: 
`{
  "_id":"id", 
  "Nome":"Nome", 
  "Tarefas": [
            {"cod":"codigo", 
            "texto":"texto}}
            }`  
O sistema possui 3 telas principais: 
 * 1 - Login: Utilizada para fazer um fetch GET na API e carregar o usuário no contexto da aplicação
 * 2 - Cadastro: Utilizada para fazer um fetch POST na Api. Esta opção não carrega automaticamente o usuário no contexto da aplicação.
 * 3 - Gestão: Utilizada para fazer um fetch PUT na Api e alterar a lista de tarefas do usuário através de inclusão e exclusão de itens.

## Estrutura:
Dentro da pasta src o projeto foi dividido em partes segundo sua função.
* Componentes
    - Os componentes são as estruturas utilizadas para compor a interface gráfica do sistema. Foi utilizado o framework Bootstrap para construção dos componentes.
\ O Menu.jsx utiliza o contexto das páginas para controlar a transição entre as páginas de login, cadastro e gestão enquanto as outras são responsáveis por executar as chamadas à API do CRUDCRUD e atualizar os dados.
* Context
       -O Context é responsável por distribuir recursos para todos os componentes. Esta aplicação utiliza 3 contexts diferentes: O de página (para controlar quais páginas serão exibidas) o de Usuário (para controlar qual usuário está logado no momento) e o de Processamento (para controlar as chamadas à API e evitar chamadas repedidas).
    
* Hooks
     -Esta aplciação usa um hook customizado cuja função é disponibilizar as funções de fetch (GET, PUT e POST) e estados que são usadas pelos componentes, fazendo assim a reutilização do código e encapsulamento.
* App.jsx
     -O APP é a peça central do sistema responsável por gerir qual tela será renderizada conforme seleção no menu de navegação que fica na parte superior da tela
* Main.jsx
     -O main é responsável por introduzir o APP no root do arquivo html e dispobibilizar os Context.Providers para o APP
## Controles  
Neste sistema, além do useContext e dos Hooks personalizados, foram utilziados useState para gerenciar o estado de um componente e permitir ou não a renderização de um componente conforme sua alteração. Utilizou-se também do useRef para controlar, de forma estática, o prosseguimento ou não das funções fetch e o useeffect para iniciar funções que dependiam da mudança de algum estado no componente.   
Embora tenha sido pensado, foi necessário usar o ReactMemo para controlar a renderização da tabela

## Usando o sitema
Primeiramente realize o cadastro e anote o ID gerado pelo CRUDCRUD. Em seguida, utilizando o menu de navegação, vá a pagina de Login e cole o ID para carregar as informações do usuário no sistema. por fim inclua e exclua as tarefas utilizando a tela de gestão. 


