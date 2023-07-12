const negocio = require('../negocio/cliente_negocio')

async function cadastrarClientes(req, res) {
    const clientes = req.body

    try {
        const clienteInserido = await negocio.cadastrarClientes(clientes)
        res.status(201).json(clienteInserido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarClientePorNome(req, res) {
    const nome = req.params.nome

    try {
        const clienteNome = await negocio.buscarClientePorNome(nome)
        res.status(200).json(clienteNome)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarClientePorMatricula(req, res) {
    const matr = req.params.matricula

    try {
        const clienteMatr = await negocio.buscarClientePorMatricula(matr)
        res.status(200).json(clienteMatr)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function buscarClientes(req, res) {
    const cliente = req.body

    try {
        const clientes = await negocio.buscarClientes(cliente)
        res.status(200).json(clientes)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function atualizarCliente(req, res) {
    const matr = req.params.matricula
    const clienteUp = req.body

    try {
        const clienteAtualizado = await negocio.atualizarCliente(matr, clienteUp)
        res.status(200).json(clienteAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}

async function deletarCliente(req, res) {
    const matricula = req.params.matricula

    try {
        const clienteDel = await negocio.deletarCliente(matricula)
        res.status(200).json(clienteDel)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno não identificado"})
        }
    }
}


module.exports = {
    cadastrarClientes,
    buscarClientePorNome,
    buscarClientePorMatricula,
    buscarClientes,
    atualizarCliente,
    deletarCliente
}