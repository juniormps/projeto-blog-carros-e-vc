# Blog Carros e Você

Este projeto é um mini blog desenvolvido em React.js com Vite, com foco em praticar e consolidar conhecimentos em desenvolvimento frontend, rotas, autenticação, gerenciamento de estado, consumo de API/serviços backend e construção de interfaces responsivas.

Ele foi criado como um projeto de estudo para colocar em prática conceitos fundamentais de React, incluindo componentes, hooks, Context API, React Router, formulários, navegação e integração com Firebase.

## Visão geral

O Blog Carros e Você permite que usuários:

- visualizem posts publicados em uma home page;
- acessem o conteúdo completo de cada postagem;
- realizem buscas por posts;
- criem uma conta e façam login;
- publiquem, editem e removam posts no painel do usuário;
- naveguem por páginas como Sobre e Não Encontrado.

## Funcionalidades

- Listagem de posts na página inicial;
- Página de detalhes de cada post;
- Busca de conteúdo;
- Autenticação de usuários com Firebase;
- Dashboard para gerenciamento de posts;
- Criação, edição e exclusão de publicações;
- Notificações visuais com toasts;
- Estrutura modular com componentes reutilizáveis e CSS Modules.

## Tecnologias utilizadas

- React.js
- Vite
- React Router DOM
- Firebase Authentication
- Firebase Firestore
- React Toastify
- CSS Modules
- ESLint

## Estrutura do projeto

- src/components: componentes reutilizáveis da interface;
- src/pages: páginas principais da aplicação;
- src/context: contexto de autenticação;
- src/hooks: hooks personalizados;
- src/firebase: configuração do Firebase;
- src/styles: estilos globais e módulos de estilo.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão recomendada: 18 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/projeto-blog-carros-e-vc.git
cd projeto-blog-carros-e-vc
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o Firebase:

No arquivo src/firebase/config.jsx, substitua as credenciais de exemplo pelas suas configurações do projeto Firebase.

## Executando localmente

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em http://localhost:5173.

## Build para produção

```bash
npm run build
```

## Melhorias que ainda podem e devem ser feitas

Este projeto é uma base sólida para estudos e evolução, mas ainda há oportunidades importantes de melhoria:

- implementar paginação ou carregamento infinito para posts;
- adicionar upload de imagens para capa dos posts;
- melhorar a experiência de edição com preview do conteúdo antes de publicar;
- criar testes unitários e de integração;
- implementar melhor tratamento de erros e feedbacks ao usuário;
- melhorar a acessibilidade da interface (ARIA, contraste, navegação por teclado);
- adicionar temas claro/escuro;
- reforçar a segurança e regras de permissão para posts;
- otimizar o desempenho e a organização do código para escalabilidade;
- evoluir a arquitetura para componentes mais reutilizáveis e consistentes.

## Observações

Este projeto foi desenvolvido como uma proposta de estudo para colocar em prática conhecimentos em React.js e tecnologias associadas, com foco em aprender na prática o fluxo de construção de uma aplicação web completa, do frontend ao backend de autenticação e banco de dados.

## Autor

Projeto desenvolvido por um estudante em formação, com o objetivo de aprofundar conhecimentos em React e desenvolvimento web.
