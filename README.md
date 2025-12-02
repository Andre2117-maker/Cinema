🎬 CineAndré — Sistema de Cinema em React

Bem-vindo ao CineAndré, um sistema completo de exibição de filmes, login, sessões e seleção de cadeiras.
Este projeto foi desenvolvido utilizando React + Vite, integrado com API e gerenciamento de rotas.

📌 Funcionalidades
🏠 Home

Lista de filmes em cartaz.

Botão para ver detalhes de cada filme.

Botão para acessar sessões disponíveis.

🎞️ Movie Details

Exibe informações completas sobre o filme.

Lista de sessões vinculadas ao filme.

Redirecionamento para seleção de cadeiras.

💺 Seat Selection

Tela interativa para escolher cadeiras disponíveis.

Bloqueio de cadeiras já ocupadas.

Confirmação de compra.

🔐 Autenticação

Login e Registro de usuários.

Logout.

NavBar atualizada conforme login.

🧱 Tecnologias usadas

React

Vite

React Router DOM

Axios

CSS / Tailwind (se estiver usando)

API própria para filmes e sessões

🚀 Como rodar o projeto
1️⃣ Instale as dependências:
npm install

2️⃣ Inicie o projeto:
npm run dev

3️⃣ Acesse no navegador:
http://localhost:5173

📁 Estrutura de pastas
src/
 ├─ components/
 │   ├─ NavBar.jsx
 │   ├─ MovieCard.jsx
 │   ├─ SessionsList.jsx
 │   └─ SeatSelection.jsx
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ Login.jsx
 │   ├─ Register.jsx
 │   └─ MovieDetails.jsx
 │
 ├─ services/
 │   └─ api.js
 │
 ├─ assets/
 │   └─ imagens, ícones etc.
 │
 ├─ App.jsx
 └─ main.jsx

🔗 Rotas configuradas
Rota	Tela
/	Home
/login	Login
/register	Registro
/filme/:id	Detalhes do filme
/sessao/:id	Seleção de cadeiras
🗂️ API Esperada

A API deve fornecer endpoints como:

/movies

/movies/:id

/sessions/:movieId

/seats/:sessionId

(Se quiser, posso te ajudar a montar o backend também.)

🤝 Contribuição

Sinta-se livre para abrir issues e enviar pull requests.

📄 Licença

Esse projeto é de uso livre para estudo.
