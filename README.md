# Projeto de Dashboard de Filmes

Este projeto é um dashboard de filmes construído com Next.js, React e Styled Components. O dashboard permite que você pesquise e visualize filmes e séries populares, com funcionalidades de paginação e exibição de detalhes dos filmes.

 - Link do projeto na vercel: https://moviesdashboard-nextjs-b28xhdsxr-villefors-projects.vercel.app/

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **React**: Biblioteca para construção de interfaces de usuário.
- **Styled Components**: Biblioteca para estilização de componentes.

## Funcionalidades

- Pesquisa de filmes e séries populares.
- Exibição de detalhes dos filmes e séries.
- Paginação para resultados de pesquisa.
- Modais responsivos para detalhes dos filmes.

## Configuração

Para configurar e executar o projeto localmente, siga os passos abaixo.

### 1. Clone o Repositório

```bash
git clone git@github.com:Villefor/moviesdashboard-NEXTJS.git
cd seu-repositorio

### 2. Instale as dependências do projeto

- bash
  - npm install
  - npm install -D tailwindcss postcss autoprefixer

### 3. Configure as Variáveis de Ambiente

- Observação: para obter as chaves necessárias deverá se cadastrar no site https://developer.themoviedb.org/reference/intro/getting-started
  - Obtenha a api_key para configuração do env.local
  - NEXT_PUBLIC_API_KEY: Sua chave da API para acessar os dados de filmes e séries.

- env.local
  - NEXT_PUBLIC_API_KEY=seu-api-key

### 4. Execute o projeto

- npm run dev
