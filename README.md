![visitors](https://visitor-badge.laobi.icu/badge?page_id=christianebs.js-pdv) ![GitHub Repo stars](https://img.shields.io/github/stars/christianebs/js-pdv) ![GitHub pull requests](https://img.shields.io/github/issues-pr/christianebs/js-pdv) ![GitHub closed issues](https://img.shields.io/github/issues-closed/christianebs/js-pdv)

# API Sistema de PDV

Este projeto foi desenvolvido como parte do Módulo 5 da **Cubos Academy**. Consiste em uma API de um Sistema de Ponto de Vendas, onde é possível realizar operações como upload, exclusão e alteração de imagens utilizando a ferramenta Backblaze. Além disso, o sistema permite o envio de e-mails com pedidos realizados através do SendGrid e o deploy é realizado pela Cyclic.

Nota: Inicialmente, este projeto foi realizado em um grupo de 5 pessoas, no qual fui escolhida para ser a líder. No entanto, buscando aprimorar ainda mais meus conhecimentos, decidi refazer o projeto do zero.

## :woman_mechanic: Linguagens e Ferramentas

![JavaScript](https://img.shields.io/badge/javascript-0D1117.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Postgres](https://img.shields.io/badge/postgres-0D1117.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0D1117.svg?style=for-the-badge&logo=visual-studio-code&logoColor=0078d7) ![Insomnia](https://img.shields.io/badge/Insomnia-0D1117?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![Beekeeper](https://img.shields.io/badge/beekeeper-0D1117?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAFNUExURQAAAP//a/rXOvPUOejMN/jWOvjWOenQOP/fPP3VOf/nOf/xP+zSOPzYOvvYOo98IfTTOfjWOvjWOfjWOffWOf//R1xQFUc+EO7NN/jWOvjWOfjWOffWOfjWOf/cO5J+IvjWOfjWOfjWOffWOfjWOfjWOvfWOfjWOvjWOvnXO/nXOvjWOvfWOfjWOfjWOfjWOfjWOfjWOvfWOfjWOfjWOfjWOvfWOfjWOfjWOfnXOjoyDe/ON/vYOvzZOv3aO5WBIjkxDd7AM8esLpJ+ItC0MPrYOvjWOZaBIzUuDKONJqSOJj83DiQfCJSAIvXTOTcvDM2xL/HQOObGNXppHBUTBcCmLO/PN/rXOvvZOuTFNSokCZqFJJiDIyslCuXGNeXFNbyiKxQRBH5sHefHNX1sHRUSBb+lLPTSOI57ISMeCJF9IfTTOXtrHM+zMP///548sBYAAAA5dFJOUwAAAAAAAAAAAAAAAAAAABqI7eyGGQpYx/v7xlYKNa729qw0KtTSKWH6aPxiK9U3sPf3C1rJ/ByK7y1GWkAAAAABYktHRG4iD1EXAAAAB3RJTUUH5wkZEwMcxtjpWwAAAJtJREFUCB0FwdtKw0AUQNG9JydOW6wIUgUviOiL4P//iC8iiC0iFQURvFBCMse1BDxQ9dMJw0P1irX6rrOVnqk5bXXrtaeq6s/y2QiZqer8o8soQlXVKBnA7vtcVSGACx3Yaw0IyNAeNaGUNtZah+Gt78dWupPu6KV+HbN63Cz/cHGj88tXctq1fHJ/uFODMTPvq9AtbpXMh9+Jf7viMqPTlzUXAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA5LTI1VDE5OjAzOjI4KzAwOjAwxaUCOQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wOS0yNVQxOTowMzoyOCswMDowMLT4uoUAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDktMjVUMTk6MDM6MjgrMDA6MDDj7ZtaAAAAAElFTkSuQmCC&logoColor=5849BE) ![Git](https://img.shields.io/badge/git-0D1117.svg?style=for-the-badge&logo=git&logoColor=%23F05033) ![GitHub](https://img.shields.io/badge/github-0D1117.svg?style=for-the-badge&logo=github&logoColor=white)

[Cyclic](https://www.cyclic.sh/) | [SendGrid](https://sendgrid.com/) | [BackBlaze](https://www.backblaze.com/)

## :paintbrush: Layout

- Em breve


## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## :card_file_box: Fucionalidades do Projeto

- [x] Gerenciamento de Usuários
    - Cadastrar Usuário
    - Fazer Login
    - Detalhar Perfil do Usuário Logado
    - Editar Perfil do Usuário Logado

- [x] Gerenciamento de Categorias
    - Listar categorias

- [x] Gerenciamento de Clientes
    - Listar clientes
    - Detalhar cliente
    - Cadastrar cliente
    - Editar cliente
    - Remover cliente

- [x] Gerenciamento de Pedidos
    - Cadastrar pedido
    - Detalhar pedido

- [x] Envio de E-mails

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone https://github.com/christianebs/js-pdv/

# 2. Instale as dependências

npm install

# 3. Execute o servidor com nodemon para reinicialização automática

npm run dev
```

Observações:

- As dependências estão definidas no arquivo package.json. Ao executar **npm install**, todas elas serão instaladas 
- O arquivo package.json já contém a configuração necessária na seção de scripts para utilizar o nodemon:

```shell 
"scripts": {
    "dev": "nodemon ./src/index.js"
},
```
Essa configuração permite iniciar o servidor em modo de desenvolvimento usando o nodemon.

- Não é necessário inicializar um novo projeto Node.js com **npm init -y**, pois ao clonar o repositório, você já terá um package.json configurado.
- Para encerrar todos os serviços, utilize o atalho padrão do terminal pressionando **CTRL+C**. Esse comando interrompe a execução dos processos, encerrando o servidor e liberando o terminal.

## :arrows_counterclockwise: Endpoints

- GET /categoria - Listar todas as categorias cadastradas
- POST /usuario - Cadastrar um novo usuário no sistema
- POST /login - Realizar o login de um usuário cadastrado
- GET /usuario - Obter informações do perfil do usuário autenticado
- PUT /usuario - Atualizar informações do perfil do usuário autenticado
- POST /produto - Adicionar um novo produto associada ao usuário logado
- GET /produto - Obter uma lista de todos os produtos do usuário logado
- GET /produto/:id - Consultar detalhes de um produto específico do usuário logado
- PUT /produto/:id - Atualizar informações de um produto do usuário logado
- DELETE /produto/:id - Excluir um produto do usuário logado
- POST /cliente - Adicionar um novo cliente associado ao usuário logado
- PUT /cliente/:id - Atualizar informações de um cliente do usuário logado
- GET /cliente - Obter uma lista de todos os clientes do usuário logado
- GET /cliente/:id - Consultar detalhes de um cliente específico do usuário logado
- POST /pedido - Adicionar um novo pedido associado ao cliente
- GET /pedido - Obter uma lista de todos os pedidos do cliente

## :woman_technologist: Desenvolvedora


| [<img src="https://user-images.githubusercontent.com/108686840/271874870-1003d6c2-7574-4104-a392-ab6b2713cff2.png" width=115><br><sub>Christiane Barbosa</sub>](https://github.com/christianebs) |
| :----------------------------------------------------------------------------------------------------------------------------------: 