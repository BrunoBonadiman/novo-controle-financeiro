const mongoose = require('mongoose');

var Ferias = mongoose.model('Ferias', {
    Valor: {
        type: String,
        required: true,
    },
    Data: {
        type: String,
        required: true,
    },
    Observacao: {
        type: String,
        required: true
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
    Ferias
};