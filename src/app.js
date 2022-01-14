const express = require('express');
const morgan = require('morgan');

const app = express();
//middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());



//Rutas
app.use(require('./routes/usuario'));
app.use(require('./routes/asistencias'));
//Archivos estaticos

module.exports = app;