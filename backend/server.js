require('./src/config/config');
require('./src/middlewares/db');
require('./src/middlewares/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const http = require('http');

const routesUser = require('./src/routes/user.router');
const routesConta = require('./src/routes/contas.router');
const routesContaDetalhes = require('./src/routes/conta-detalhes.router');
const routesEntradasSaidas = require('./src/routes/entradas-saidas.router');
const routesFerias = require('./src/routes/ferias.router');
const routesDespesasAlternativas = require('./src/routes/despesas-alternativas.router');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', routesUser);
app.use('/api/contas', routesConta);
app.use('/api/contas/detalhes', routesContaDetalhes);
app.use('/api/entradas-saidas', routesEntradasSaidas);
app.use('/api/ferias', routesFerias);
app.use('/api/despesas-alternativas', routesDespesasAlternativas);

app.use('/files', express.static(path.resolve(__dirname, './temp/uploads')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } else {
        console.log(err);
    }
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta : ${process.env.PORT}`));