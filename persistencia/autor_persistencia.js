const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function cadastrarAutores(autores) {
    const cliente = new Client(conexao)
    await cliente.connect()

    try {
        const sql = `INSERT INTO autores(nome, pais_origem) VALUES($1, $2) RETURNING *`
        const valuesAuthor = [autores.nome, autores.pais_origem]
        const autorCadastrado = await cliente.query(sql, valuesAuthor)

        await cliente.end()
        return autorCadastrado.rows[0]
    } catch (error) { throw error }
}

async function buscarAutor() {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT DISTINCT nome, pais_origem FROM autores`
        const autorNome = await cliente.query(sql)

        await cliente.end()
        return autorNome.rows
    } catch (error) { throw error }
}

module.exports = {
    cadastrarAutores,
    buscarAutor
}