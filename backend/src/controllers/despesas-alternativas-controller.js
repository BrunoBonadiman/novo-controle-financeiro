var ObjectId = require('mongoose').Types.ObjectId;

var {
    DespesasAlternativas
} = require('../models/despesas-alternativas');

module.exports.listar = (req, res, next) => {
    DespesasAlternativas.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Ocorreu um erro ao tentar recuperar a lista de despesas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    DespesasAlternativas.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao recuperar despesas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.inserir = (req, res, next) => {
    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var despesaAlternativa = new DespesasAlternativas({
        Descricao: req.body.Descricao,
        Valor: req.body.Valor,
        DataVencimento: req.body.DataVencimento,
        Status: req.body.Status,
        User: req.body.User
    });
    despesaAlternativa.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao cadastrar despesas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.editar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var despesaAlternativa = {
        Descricao: req.body.Descricao,
        Valor: req.body.Valor,
        DataVencimento: req.body.DataVencimento,
        Status: req.body.Status,
        User: req.body.User
    };
    DespesasAlternativas.findByIdAndUpdate(req.params.id, {
        $set: despesaAlternativa
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao atualizar despesas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    DespesasAlternativas.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao deletar despesa :' + JSON.stringify(err, undefined, 2));
        }
    });
};