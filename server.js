const express = require('express');
const bodyParser = require('body-parser');
const process= require('process');
const Bundler = require('parcel-bundler');
require('dotenv').config();

const app = express();
   
//parcel bundler
const file = "./src/index.html"; 
const options ={};
let bundler = new Bundler(file, options);

//express.js middleware
app.use(bundler.middleware());
app.use(express.json());
app.use("/dist", express.static('./dist'));
app.use("/src", express.static('./src'));
app.use(bodyParser.urlencoded({ extended: true }));
  
//load main page
app.get('/', (req, res) => {res.sendFile("./dist/index.html")});

//====================================================================================================
//SOCKET.io
const server = require('http').createServer(app);
var ab1="";
const io = require('socket.io')(server);
io.on('connection', socket => {console.log(socket.id); socket.on('event', (data)=>{ab1=data; console.log(ab1);})});
    

//====================================================================================================
server.listen(process.env.PORT, () => {console.log('listening on port ' + process.env.PORT);});