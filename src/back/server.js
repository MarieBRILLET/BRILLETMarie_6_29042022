//création du serveur
const http = require('http');
const app = require('./app');
//importation variables d'environement
const dotenv = require('dotenv');
const result = dotenv.config();

app.set('port', process.env.PORT);
const server = http.createServer(app);

server.listen(process.env.PORT);