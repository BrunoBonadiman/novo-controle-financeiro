const mongoose = require("mongoose");

var Contas = mongoose.model("Contas", {
  Descricao: {
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
  Mes: {
    type: String,
    required: true,
  },
  Ano: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pago", "Pendente", "Em Atraso"],
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
  Contas,
};
