# Repositório

O repositório contém o projeto de uma aplicação para retornar a temperatura de um local, utilizando a API do [OpenWeatherMap](https://openweathermap.org/api).

Como a API do OpenWeatherMap necessita de uma chave de API, foi desenvolvido um servidor Node.js que funciona como um BFF para o fronted, dessa forma, a chave de API fica oculta para o fronted.

Para a estilização foi utilizado o [TailwindCSS](https://tailwindcss.com/docs/installation).

Desenvolvido baseado no seguinte [vídeo do YouTube](https://www.youtube.com/watch?v=ZGymN8aFsv4).

O deploy foi feito no Heroku e pode ser acessado em:

[https://weather-app-api-proxy-server.herokuapp.com](https://weather-app-api-proxy-server.herokuapp.com)

## Rodando a aplicação

Basta instalar as dependências, adicionar as variáveis apropriadas no arquivo `.env` e executar o comando `npm run dev` para rodar a aplicação. Feito isso a aplicação estará disponível em [http://localhost:5000](http://localhost:5000).

## BFF

Além de chamar a API do OpenWeatherMap com a chave de API correta, o BFF também possui configurado rate limiting para evitar que o usuário faça muitas requisições. Além disso, para melhorar a performance, está configurado um cache para as requisições.
