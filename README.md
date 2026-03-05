<h1 align="center">📚 Online Book Review — IBM</h1>
<p align="center">
  Sistema de avaliação de livros online — Projeto do curso IBM Full Stack.
</p>
<p align="center">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img alt="IBM" src="https://img.shields.io/badge/IBM_Course-052FAD?style=for-the-badge&logo=ibm&logoColor=white"/>
</p>

---

## 📋 Sobre

Projeto desenvolvido como parte do curso de **Desenvolvimento Full Stack da IBM**. Uma aplicação de **revisão de livros online** com API RESTful que permite cadastrar, consultar e avaliar livros.

## ✨ Funcionalidades

- 📖 Listagem de todos os livros disponíveis
- 🔍 Busca por ISBN, título ou autor
- ⭐ Cadastro e consulta de avaliações de livros
- 👤 Registro e login de usuários
- 🔐 Rotas protegidas com autenticação JWT
- ⚡ Suporte a requisições assíncronas com Promises e Async/Await

## 🚀 Como executar

```bash
git clone https://github.com/LuigiNeto01/Online-Book-Review-IBM.git
cd Online-Book-Review-IBM

npm install
npm start
```

A API estará disponível em `http://localhost:5000`.

## 📡 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Lista todos os livros |
| GET | `/isbn/:isbn` | Busca por ISBN |
| GET | `/author/:author` | Busca por autor |
| GET | `/title/:title` | Busca por título |
| GET | `/review/:isbn` | Obtém reviews |
| POST | `/register` | Cadastra usuário |
| POST | `/customer/login` | Login |
| PUT | `/customer/auth/review/:isbn` | Adiciona review |
| DELETE | `/customer/auth/review/:isbn` | Remove review |

## 🚀 Tecnologias

- **Node.js** + **Express.js**
- **JWT** (autenticação)
- **Axios** (requisições HTTP)

---

<p align="center">Feito com ❤️ por <a href="https://github.com/LuigiNeto01">LuigiNeto01</a></p>
