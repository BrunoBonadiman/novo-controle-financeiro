const mongoose = require('mongoose');

var EntradasSaidas = mongoose.model('EntradasSaidas', {
    Descricao: {
        type: String,
        required: true,
    },
    Valor: {
        type: String,
        required: true,
    },
    Mes: {
        type: String,
        required: true,
    },
    Ano: {
        type: String,
        required: true,
    },
    Tipo: {
        type: String,
        enum: ['Entrada', 'Saída', 'Salário'],
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        allowNull: false,
        type: Date,
    },
    updatedAt: {
        allowNull: false,
        type: Date,
    },
});

module.exports = {
    EntradasSaidas
};