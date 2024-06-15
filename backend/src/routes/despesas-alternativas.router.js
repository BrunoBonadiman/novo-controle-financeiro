const express = require('express');
const router = express.Router();

const DespesasAlternativasController = require('../controllers/despesas-alternativas-controller');

const jwtHelper = require('../middlewares/jwtHelper');

router.get('/listar', jwtHelper.verifyJwtToken, DespesasAlternativasController.listar);
router.get('/:id', DespesasAlternativasController.buscar);
router.post('/cadastrar', jwtHelper.verifyJwtToken, DespesasAlternativasController.inserir);
router.put('/:id', jwtHelper.verifyJwtToken, DespesasAlternativasController.editar);
router.delete('/:id', DespesasAlternativasController.deletar);

module.exports = router;