# Repositório

O repositório contém o projeto de uma aplicação para retornar a temperatura de um local, utilizando a API do [OpenWeatherMap](https://openweathermap.org/api).

Como a API do OpenWeatherMap necessita de uma chave de API, foi desenvolvido um servidor Node.js que funciona como um BFF para o fronted, dessa forma, a chave de API fica oculta para o fronted.

Para a estilização foi utilizado o [TailwindCSS](https://tailwindcss.com/docs/installation).

## Rodando a aplicação

Basta instalar as dependências, adicionar as variáveis apropriadas no arquivo `.env` e executar o comando `npm run dev` para rodar a aplicação. Feito isso a aplicação estará disponível em [http://localhost:5000](http://localhost:5000).
