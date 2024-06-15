var ObjectId = require('mongoose').Types.ObjectId;

var {
    ContasDetalhe
} = require('../models/conta-detalhe');


module.exports.listar = (req, res, next) => {
    ContasDetalhe.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Ocorreu um erro ao tentar recuperar a lista de contas :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.buscar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

        ContasDetalhe.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao recuperar conta :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.inserir = (req, res, next) => {
    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var conta = new ContasDetalhe({
        Descricao: req.body.Descricao,
        Detalhe: req.body.Detalhe,
        Valor: req.body.Valor,
        DataVencimento: req.body.DataVencimento,
        Parcela: req.body.Parcela,
        Mes: req.body.Mes,
        Ano: req.body.Ano,
        Tipo: req.body.Tipo,
        Status: req.body.Status,
        Responsavel: req.body.Responsavel,
        User: req.body.User
    });
    conta.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao cadastrar conta :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.editar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

    const usuarioId = res.locals.auth_data._id;
    req.body.User = usuarioId;

    var conta = {
        Descricao: req.body.Descricao,
        Detalhe: req.body.Detalhe,
        Valor: req.body.Valor,
        DataVencimento: req.body.DataVencimento,
        Parcela: req.body.Parcela,
        Mes: req.body.Mes,
        Ano: req.body.Ano,
        Tipo: req.body.Tipo,
        Status: req.body.Status,
        Responsavel: req.body.Responsavel,
        User: req.body.User
    };
    ContasDetalhe.findByIdAndUpdate(req.params.id, {
        $set: conta
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao atualizar conta :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.deletar = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Nenhum registro com o ID fornecido : ${req.params.id}`);

        ContasDetalhe.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Erro ao deletar Conta :' + JSON.stringify(err, undefined, 2));
        }
    });
};

// model.find({idade:req.query.idade}).then((result) => {
//     res.json(result)
// }, (err) => {
//     res.status(500).json({error: err})
// })