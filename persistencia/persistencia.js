const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function retirada(matricula, id_livro, data_retirada) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`INSERT INTO retirada(matricula_cliente, livro_id, data_retirada) 
                                                       VALUES($1, $2, $3) RETURNING *`, [matricula, id_livro, data_retirada])
        await cliente.end()
        return sql.rows
    } catch (error) { throw error }
}

async function devolucao(livro_id, data_devolucao, id_retirada, matricula) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const res = await cliente.query(`INSERT INTO devolucao(livro_id, data_devolucao, id_retirada, matricula) VALUES($1, $2, $3, $4) RETURNING *`, 
        [livro_id, data_devolucao, id_retirada, matricula])

        await cliente.end()
        return res.rows[0]
    } catch (error) { throw error }
}

async function buscarDevolucao(retirada) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM devolucao WHERE id_retirada = $1`
        const values = [retirada]
        const dataDevolucao = await cliente.query(sql, values)

        await cliente.end()
        return dataDevolucao.rows[0]
    } catch (error) { throw error }
}

async function buscarRetiradaId(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM retirada WHERE id_retirada = $1`
        const values = [id]
        const retiradaId = await cliente.query(sql, values)

        await cliente.end()
        return retiradaId.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    retirada,
    devolucao,
    buscarDevolucao,
    buscarRetiradaId
}