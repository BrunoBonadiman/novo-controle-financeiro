var ObjectId = require('mongoose').Types.ObjectId;

var {
    Ferias
} = require('../models/ferias');

module.exports.listar = (req, res, next) => {
    Ferias.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Ocorreu um erro ao tentar recuperar a lista de valores de férias :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Ferias.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao recuperar valores de férias :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.inserir = (req, res, next) => {
    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var ferias = new Ferias({
        Valor: req.body.Valor,
        Data: req.body.Data,
        Observacao: req.body.Observacao,
        User: req.body.User
    });
    ferias.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao cadastrar valor :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.editar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var ferias = {
        Valor: req.body.Valor,
        Data: req.body.Data,
        Observacao: req.body.Observacao,
        User: req.body.User
    };
    Ferias.findByIdAndUpdate(req.params.id, {
        $set: ferias
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao atualizar valor :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    Ferias.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao deletar valor :' + JSON.stringify(err, undefined, 2));
        }
    });
};