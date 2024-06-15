const express = require('express');
const router = express.Router();

const ContaDetalhesController = require('../controllers/conta-detalhes.controller');

const jwtHelper = require('../middlewares/jwtHelper');

router.get('/listar', jwtHelper.verifyJwtToken, ContaDetalhesController.listar);
router.get('/:id', ContaDetalhesController.buscar);
router.post('/cadastrar', jwtHelper.verifyJwtToken, ContaDetalhesController.inserir);
router.put('/:id', jwtHelper.verifyJwtToken, ContaDetalhesController.editar);
router.delete('/:id', ContaDetalhesController.deletar);

module.exports = router;