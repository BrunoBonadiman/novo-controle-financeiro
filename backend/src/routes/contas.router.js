const express = require('express');
const router = express.Router();

const ContasController = require('../controllers/contas.controller');

const jwtHelper = require('../middlewares/jwtHelper');

router.get('/listar', jwtHelper.verifyJwtToken, ContasController.listar);
router.get('/:id', ContasController.buscar);
router.post('/cadastrar', jwtHelper.verifyJwtToken, ContasController.inserir);
router.put('/:id', jwtHelper.verifyJwtToken, ContasController.editar);
router.delete('/:id', ContasController.deletar);

module.exports = router;