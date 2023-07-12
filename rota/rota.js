const express = require('express')
const controller = require('../controller/controller')

const router = express.Router()

// api/biblioteca
router.post('/retirada', controller.retirada)
router.post('/devolucao', controller.devolucao)
module.exports = router