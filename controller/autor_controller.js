const negocio = require('../negocio/autor_negocio')

async function cadastrarAutores(req, res) {
    const autores = req.body
    
    try {
        const autorInserido = await negocio.cadastrarAutores(autores)
        res.status(201).json(autorInserido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarAutor(req, res) {
    const autor = req.body

    try {
        const autores = await negocio.buscarAutor(autor)
        res.status(200).json(autores)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

module.exports = {
    cadastrarAutores,
    buscarAutor
}