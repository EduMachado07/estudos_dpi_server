# Estudos DPI - Servidor

Este é o backend do [Estudos DPI](https://dpi-estudos.vercel.app/).

Uma API RESTful construída com NodeJS + TypeScript + Express.

O servidor da aplicação é responsável por gerenciar toda a lógica de negócio, processamento de dados e comunicação com o banco de dados do sistema de estudos bíblicos.

Para facilitar a interação com o banco de dados foi utilizado o **ORM Prisma**, conectado a um banco **PostgreSQL**. 
Essa abordagem permite trabalhar com consultas tipadas e maior segurança no acesso aos dados.

Além disso, o servidor também implementa mecanismos de segurança, como autenticação baseada em tokens (Refresh Token) e controle de acesso às rotas protegidas.

## Começando

### Pré-requisitos

Para executar este projeto no modo de **desenvolvimento**, você precisará ter um ambiente básico com o Node.js 20+ e NPM 10+ instalado.

### Instalando

**Clonando Repositório**

```
$ git clone https://github.com/EduMachado07/estudos_dpi_server.git

$ cd estudos_dpi_server
```

**Instalando dependências**

```
$ yarn
```

_or_

```
$ npm install
```

**Criando arquivo .env**

Na raiz do projeto, crie um arquivo chamado:

```
.env
```

Você pode fazer isso manualmente ou usando o terminal:

```
touch .env
```

**Adicionando as variáveis de ambiente**

**CLOUDINARY**

Credenciais utilizadas para upload e armazenamento de imagens através do serviço Cloudinary.

```
CLOUDINARY_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_SECRET_KEY=
```
```
DATABASE_URL=

GROQ_API_KEY=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

PORT_SERVER=

URL_CLIENT=
```

**Executando servidor**

Com todas as dependências instaladas, e o ambiente configurado corretamente, agora você pode executar o servidor:

```
$ yarn dev
```

_or_

```
$ npm run dev
```

## Rotas

A base URL é: http://localhost:3333

