# Pokedex

Uma Pokédex simples e usual.

## Ferramentas de desenvolvimento

Para o desenvolvimento deste projeto, foram utilizadas algumas ferramentas:

- [Angular 9](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Angular PWA](https://www.npmjs.com/package/@angular/pwa)
- [ChartJS](https://www.chartjs.org/)
- [Karma](https://karma-runner.github.io)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## API

Foi utilizada a API [PokéAPI](https://pokeapi.co/) como servidora de dados.

## Deploy

O deploy da aplicação foi feito na plataforma [Heroku](www.heroku.com) e pode ser acessado
através [deste link](https://pokedex-teste-justa.herokuapp.com).
Vale salientar que a aplicação está com integração contínua associada à sua branch master.

## Estruturação do código

A raiz da aplicação Angular, localizada no diretório "src", contém a estrutura mostrada abaixo:

- "app": Diretório principal da aplicação.
- "environments": Diretório contendo arquivos de configuração de ambiente.
- "assets": Diretório contendo arquivos auxiliares (scripts e imagens) do projeto.

No diretório "app", a estruturação se dá da seguinte forma:

- "core": Módulo contendo elementos principais da aplicação, como guardas de rota, serviços e modelos.
- "shared": Módulo contendo elementos compartilhados em toda a aplicação, como modais, pipes e componentes.
- "pokelist": Módulo Feature de listagem de Pokémons.
  - "pages": Diretório contendo as principais páginas do módulo.
- "pokestatistics": Módulo Feature de gráficos de estatísticas de Pokémon.
  - "pages": Diretório contendo as principais páginas do módulo.

A linguagem da aplicação está em inglês, contudo os comentários de código estão em português para melhor avaliação.

## Features da aplicação

A aplicação tem duas Features principais:

- Listagem e visualização de detalhes de Pokémons.
- Dashboard com gráficos de estatísticas sobre Pokémons.

## Multiplataforma

Por ser construída com Angular, a tecnologia WEB permite que a aplicação seja visualizada em qualquer tipo de tela.
Além disso, foi utilizada da tecnologia PWA para uma maior usabilidade em dispositivos móveis.
Para a instalação do PWA em seu device, basta abrir a aplicação e selecionar a opção "Adicionar à tela inicial".

## Servidor de desenvolvimento

Ao fazer o download do repositório, realizar estes comandos em sequência:

1. `npm install`
2. `ng serve`

O servidor de desenvolvimento será iniciado no caminho "localhost:4200" por padrão.

## Build do projeto

Para realizar um build da aplicação, rodar o comando `ng build`.

## Executando testes unitários

Para realizar os testes, rodar o comando `ng test`.
