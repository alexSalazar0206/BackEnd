const app = require('./app');
const http = require('http');

const server = http.createServer(app);
const port = 3003;

server.listen(port, () => {
    console.log(`la aplicacion esta corriendo al puerto ${port}`);
})
