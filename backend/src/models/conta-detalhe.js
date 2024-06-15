const mongoose = require("mongoose");

var ContasDetalhe = mongoose.model("ContasDetalhe", {
  Descricao: {
    type: String,
    required: true,
  },
  Detalhe: {
    type: String,
    required: true,
  },
  Valor: {
    type: String,
    required: true,
  },
  DataVencimento: {
    type: String,
    required: true,
  },
  Parcela: {
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
    enum: [
      "Alimentação",
      "Saúde",
      "Outros",
      "Compras",
      "Contas",
      "Educação",
      "Cuidados Pessoais",
      "Entretenimento",
      "Esportes",
      "Mercado",
      "Moradia",
      "Transporte",
      "Viagem",
    ],
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pago", "Pendente", "Em Atraso"],
    required: true,
  },
  Responsavel: {
    type: String,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  ContasDetalhe,
};
