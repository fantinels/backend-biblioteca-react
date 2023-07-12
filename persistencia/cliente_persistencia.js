const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function cadastrarClientes(clientes) {
    const cliente = new Client(conexao)
    await cliente.connect()

    try {
        const sql = `INSERT INTO clientes(nome, telefone, livros_retirados) VALUES($1, $2, $3) RETURNING *`
        const valuesClient = [clientes.nome, clientes.telefone, 0]
        const clienteCadastrado = await cliente.query(sql, valuesClient)

        await cliente.end()
        return clienteCadastrado.rows[0]
    } catch (error) { throw error }
}

async function contabilizaLivroCliente(matricula) {
    const cliente = new Client(conexao)

    await cliente.connect()

    try {
        const sql = await cliente.query(`UPDATE clientes SET livros_retirados = livros_retirados + 1 WHERE matricula = $1 RETURNING *`, 
                                                            [matricula])

        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }

}

async function limiteLivroCliente(matricula) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`SELECT * FROM clientes WHERE matricula = $1 AND livros_retirados >= 3`, [matricula])
        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function reduzLivroCliente(matricula) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `UPDATE clientes SET livros_retirados = livros_retirados - 1 WHERE matricula = $1 RETURNING *`
        const values = [matricula]
        const reduzirLivros = await cliente.query(sql, values)

        await cliente.end()
        return reduzirLivros.rows[0]
    } catch (error) { throw error }
}

async function buscarClientePorNome(nome) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM clientes WHERE nome = $1`
        const values = [nome]
        const clientes = await cliente.query(sql, values)

        await cliente.end()
        return clientes.rows[0]
    } catch (error) { throw error }
}

async function buscarClientePorMatricula(matricula) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM clientes WHERE matricula = $1`
        const values = [matricula]
        const clientes = await cliente.query(sql, values)

        await cliente.end()
        return clientes.rows[0]
    } catch (error) { throw error }
}

async function atualizarCliente(id, clientes) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`UPDATE clientes SET nome = $1, telefone = $2 WHERE matricula = $3 RETURNING *`, 
                                            [clientes.nome, clientes.telefone, id])
        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function deletarCliente(matricula) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`DELETE FROM clientes WHERE matricula = $1 RETURNING *`, [matricula])

        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function buscarClientes() {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const res = await cliente.query(`SELECT * FROM clientes ORDER BY matricula`)

        await cliente.end()
        return res.rows
    } catch (error) { throw error }
}

module.exports = {
    cadastrarClientes,
    contabilizaLivroCliente,
    limiteLivroCliente,
    reduzLivroCliente,
    buscarClientePorNome,
    buscarClientePorMatricula,
    atualizarCliente,
    deletarCliente,
    buscarClientes
}