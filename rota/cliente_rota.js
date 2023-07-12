const express = require('express')
const controller = require('../controller/cliente_controller')

const router = express.Router()

router.post('/', controller.cadastrarClientes)
router.get('/nome/:nome', controller.buscarClientePorNome)
router.get('/matricula/:matricula', controller.buscarClientePorMatricula)
router.get('/', controller.buscarClientes)
router.put('/:matricula', controller.atualizarCliente)
router.delete('/:matricula', controller.deletarCliente)

module.exports = router