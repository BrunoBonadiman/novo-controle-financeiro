const express = require('express');
const router = express.Router();

const EntradasSaidasController = require('../controllers/entradas-saidas.controller');

const jwtHelper = require('../middlewares/jwtHelper');

router.get('/listar', jwtHelper.verifyJwtToken, EntradasSaidasController.listar);
router.get('/:id', EntradasSaidasController.buscar);
router.post('/cadastrar', jwtHelper.verifyJwtToken, EntradasSaidasController.inserir);
router.put('/:id', jwtHelper.verifyJwtToken, EntradasSaidasController.editar);
router.delete('/:id', EntradasSaidasController.deletar);

module.exports = router;