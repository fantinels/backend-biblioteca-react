const express = require('express')
const controller = require('../controller/autor_controller')

const router = express.Router()

router.post('/', controller.cadastrarAutores)
router.get('/', controller.buscarAutor)

module.exports = router