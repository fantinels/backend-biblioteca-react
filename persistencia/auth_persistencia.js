const { conexao } = require('./conexao');
const { Client } = require('pg');

async function autenticacao(username, password) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const res = await cliente.query(`SELECT * FROM usuarios WHERE username = $1 AND password = $2`, [username, password])

        await cliente.end()

        if (res.rows.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error) { throw error }
}

module.exports = {
    autenticacao
}