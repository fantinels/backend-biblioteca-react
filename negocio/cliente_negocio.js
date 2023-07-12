const persistencia = require('../persistencia/cliente_persistencia')

async function cadastrarClientes(clientes) {
    const cliente = await persistencia.buscarClientePorNome(clientes.nome)

    if (cliente) {
        throw ({status: 400, message: "Cliente já registrado, por favor tente novamente!"})
    }

    if (clientes && clientes.nome && clientes.telefone) {
        try {
            const clienteInserido = await persistencia.cadastrarClientes(clientes)
            return clienteInserido
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Falta parâmetros deste cliente"
        erro.status = 400
        throw erro
    }
}

async function buscarClientePorNome(nome) {
    try {
        const clienteNome = await persistencia.buscarClientePorNome(nome)

        if (!clienteNome) {
            let erro = new Error()
            erro.message = "Nome do cliente não encontrado"
            erro.status = 404
            throw erro
        }

        return clienteNome
    } catch (error) { throw error }
}

async function buscarClientePorMatricula(matricula) {
    try {
        const clienteMatr = await persistencia.buscarClientePorMatricula(matricula)

        if (!clienteMatr) {
            let erro = new Error()
            erro.message = "Matricula do cliente não encontrado"
            erro.status = 404
            throw erro
        }

        return clienteMatr
    } catch (error) { throw error }
}

async function atualizarCliente(id, cliente) {
    const nomeExiste = await persistencia.buscarClientePorNome(cliente.nome)
    if (nomeExiste) {
        throw ({status: 400, message: "Nome já cadastrado"})
    }

    if (cliente && cliente.nome && cliente.telefone) {
        const clienteAtualizado = await persistencia.atualizarCliente(id, cliente)

        if (!clienteAtualizado) {
            let erro = new Error()
            erro.message = "Id do cliente não encontrado"
            erro.status = 404
            throw erro 
        }

        return clienteAtualizado
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste cliente"
        erro.status = 400
        throw erro
    }
}

async function deletarCliente(matricula) {
    try {
        const clienteDel = await persistencia.deletarCliente(matricula)
        
        if (!clienteDel) {
            let erro = new Error()
            erro.message = "Id do cliente não encontrado"
            erro.status = 404
            throw erro 
        }
        return clienteDel       
    } catch (error) { throw error }
        
}

async function buscarClientes() {
    try {
        const clientes = await persistencia.buscarClientes()

        if (clientes.length == 0) {
            let erro = new Error()
            erro.message = "Nenhum cliente encontrado"
            erro.status = 404
            throw erro
        }
        return clientes
    } catch (error) { throw error }
}

module.exports = {
   cadastrarClientes,
   buscarClientePorNome,
   buscarClientePorMatricula,
   atualizarCliente,
   deletarCliente,
   buscarClientes
}