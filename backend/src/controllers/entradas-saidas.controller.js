var ObjectId = require('mongoose').Types.ObjectId;

var {
    EntradasSaidas
} = require('../models/entradas-saidas');

module.exports.listar = (req, res, next) => {
    EntradasSaidas.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Ocorreu um erro ao tentar recuperar a lista de entradas e saídas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    EntradasSaidas.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao recuperar registro :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.inserir = (req, res, next) => {
    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var entradaSaida = new EntradasSaidas({
        Descricao: req.body.Descricao,
        Valor: req.body.Valor,
        Mes: req.body.Mes,
        Ano: req.body.Ano,
        Tipo: req.body.Tipo,
        User: req.body.User
    });
    entradaSaida.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao realizar cadastro :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.editar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var entradaSaida = {
        Descricao: req.body.Descricao,
        Valor: req.body.Valor,
        Mes: req.body.Mes,
        Ano: req.body.Ano,
        Tipo: req.body.Tipo,
        User: req.body.User
    };
    EntradasSaidas.findByIdAndUpdate(req.params.id, {
        $set: entradaSaida
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao atualizar registro :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    EntradasSaidas.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao deletar registro :' + JSON.stringify(err, undefined, 2));
        }
    });
};