const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('Conexão estabelecida com sucesso.');
    } else {
        console.log('Falha ao conectar com a Base de Dados : ' + JSON.stringify(err, undefined, 2));
    }
});

require('../models/user');
require('../models/conta');
require('../models/conta-detalhe');
require('../models/entradas-saidas');
require('../models/ferias');
require('../models/despesas-alternativas');