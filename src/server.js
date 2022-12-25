// import package Hapi
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// create server Hapi
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`server running on ${
    server.info.uri
  }`);
};

init();
