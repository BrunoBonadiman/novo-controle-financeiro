const express = require('express');
const router = express.Router();

const FeriasController = require('../controllers/ferias-controller');

const jwtHelper = require('../middlewares/jwtHelper');

router.get('/listar', jwtHelper.verifyJwtToken, FeriasController.listar);
router.get('/:id', FeriasController.buscar);
router.post('/cadastrar', jwtHelper.verifyJwtToken, FeriasController.inserir);
router.put('/:id', jwtHelper.verifyJwtToken, FeriasController.editar);
router.delete('/:id', FeriasController.deletar);

module.exports = router;