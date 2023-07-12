const negocio = require('../negocio/livro_negocio')

async function cadastrarLivros(req, res) {
    const livros = req.body

    try {
        const livroInserido = await negocio.cadastrarLivros(livros)
        res.status(201).json(livroInserido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarLivroPorNome(req, res) {
    const nome = req.params.nome

    try {
        const livroNome = await negocio.buscarLivroPorNome(nome)
        res.status(200).json(livroNome)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarLivroPorIsbn(req, res) {
    const isbn = req.params.isbn

    try {
        const livroIsbn = await negocio.buscarLivroPorIsbn(isbn)
        res.status(200).json(livroIsbn)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarLivroPorId(req, res) {
    const id = req.params.id

    try {
        const livroId = await negocio.buscarLivroPorId(id)
        res.status(200).json(livroId)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarLivros(req, res) {
    const livro = req.body

    try {
        let livros = await negocio.buscarLivros(livro)
        res.status(200).json(livros)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function atualizarLivro(req, res) {
    const id = req.params.id
    const livro = req.body

    try {
        const livroAtualizado = await negocio.atualizarLivro(id, livro)
        res.status(200).json(livroAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function deletarLivro(req, res) {
    const id = req.params.id

    try {
        const livroDel = await negocio.deletarLivro(id)
        res.status(200).json(livroDel)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
            console.log(error)
        }
    }
}

module.exports = {
    cadastrarLivros,
    buscarLivroPorNome,
    buscarLivroPorIsbn,
    buscarLivroPorId,
    buscarLivros,
    atualizarLivro,
    deletarLivro
}