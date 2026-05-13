# Desafio Blincast

Aplicação composta por um servidor HTTP e um cliente web de gerenciamento de um banco de dados na memória

## Tecnologias utilizadas

- __Node.js__: ambiente de execução JavaScript no servidor
- __Fastify__: framework HTTP para o servidor
- __HTML, CSS e JavaScript__ - interface para o cliente web

## Pré-requisitos

Para utilizar a aplicação é necessário ter o [Node.js](https://nodejs.org/pt-br/download) instalado (é aconselhável instalar pelo [chocolatey](https://chocolatey.org/))

## Como rodar o projeto

### 1. Clone o repositório

Rode no terminal:

```bash
git clone https://github.com/CharbelJ24/blincast_challenge
cd blincast_challenge
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3333`

## Para acessar o cliente web

Apenas abra o arquivo "index.html" dentro da pasta "client", ou rode no terminal:

```bash
start client/index.html
```

## Para acessar o servidor

Entre na pasta "server" e abra o arquivo routes.http no seu editor de código

## Rotas da API

### `POST /document`

Executa uma ação no banco de dados.

__Body:__
```json
{
    "action": "create | update | delete",
    "key": "nome",
    "value": "João"
}
```

__Resposta:__
```json
{
    "status": "ok | error",
    "code": 0
}
```

__Códigos de erro:__

| Código | Descrição |
|--------|-----------|
| 0 | Sucesso |
| 6 | Chave já existe (create) |
| 2 | Chave não existe (update) |
| 3 | Chave não existe (delete) |
| 1 | Ação inválida |

### `GET /document`

Mostra os documentos registrados.

__Resposta:__
```json
[
    { "key": "nome", "value": "João" },
    { "Key": "idade", "value": "25" }
]
```
