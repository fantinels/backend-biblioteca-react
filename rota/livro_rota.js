const express = require('express')
const controller = require('../controller/livro_controller')

const router = express.Router()

router.post('/', controller.cadastrarLivros)
// router.get('/nome/:nome', controller.buscarLivroPorNome)
// router.get('/isbn/:isbn', controller.buscarLivroPorIsbn)
router.get('/:id', controller.buscarLivroPorId)
router.get('/', controller.buscarLivros)
router.put('/:id', controller.atualizarLivro)
router.delete('/:id', controller.deletarLivro)

module.exports = router