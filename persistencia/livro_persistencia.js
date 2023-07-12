const { Client }  = require('pg')
const { conexao } = require('./conexao');

async function cadastrarLivros(livros) {
    let resLivros
    const cliente = new Client(conexao)
    await cliente.connect();

    try {
        // await cliente.query('BEGIN')

        // const sqlInserirAutores = `INSERT INTO autores(nome, pais_origem) VALUES($1, $2) RETURNING *`
        // const valuesAuthor = [livros.autores.nome, livros.autores.pais_origem]
        // const resAutores = await cliente.query(sqlInserirAutores, valuesAuthor)

        const sqlInserirLivros = `INSERT INTO livros(isbn, nome, editora, ano_publi, status) 
                                 VALUES($1, $2, $3, $4, $5) RETURNING *`
        const valuesBook = [livros.isbn, livros.nome, livros.editora, livros.ano_publi, livros.status]
        resLivros = await cliente.query(sqlInserirLivros, valuesBook)

        // await cliente.query('COMMIT')
        await cliente.end()
        return resLivros[0]
    } catch (error) { 
        // await cliente.query('ROLLBACK')
        throw error
    }
    // } finally {
    //     cliente.end()
    // } 
}

async function indisponibilizaLivro(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`UPDATE livros SET status = 'indisponível' WHERE livro_id = $1 RETURNING *`, [id])

        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function verificarDisponibilidade(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`SELECT * FROM livros WHERE livro_id = $1 AND status = 'disponível'`, [id]) 

        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function buscarLivroPorNome(nome) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * from livros WHERE nome = $1`
        const valuesLivroNome = [nome]
        const livrosNome = await cliente.query(sql, valuesLivroNome)

        await cliente.end()
        return livrosNome.rows[0]
    } catch (error) { throw error }
}

async function buscarLivroPorIsbn(isbn) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM livros WHERE isbn = $1`
        const valueLivroId = [isbn]
        const livroId = await cliente.query(sql, valueLivroId)

        await cliente.end()
        return livroId.rows[0]
    } catch (error) { throw error }
}

async function buscarLivroPorId(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM livros WHERE livro_id = $1`
        const valueLivroId = [id]
        const livroId = await cliente.query(sql, valueLivroId)

        await cliente.end()
        return livroId.rows[0]
    } catch (error) { throw error }
}

async function disponibilizaLivro(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `UPDATE livros SET status = 'disponível' WHERE livro_id = $1`
        const valuesLivroDisp = [id]
        const livrosDisp = await cliente.query(sql, valuesLivroDisp)

        await cliente.end()
        return livrosDisp.rows[0]
    } catch (error) { throw error }
}

async function buscarLivros() {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `SELECT * FROM livros ORDER BY livro_id`
        const livros = await cliente.query(sql)

        await cliente.end()
        return livros.rows
    } catch (error) { throw error }
}

async function atualizarLivro(id, livro) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = `UPDATE livros SET isbn      = $1,
                                       nome      = $2,
                                       autor_id  = $3,
                                       editora   = $4,
                                       ano_publi = $5,
                                       status    = $6
                                       WHERE livro_id = $7 RETURNING *`
        const values = [livro.isbn, livro.nome, livro.autor_id, livro.editora, livro.ano_publi, livro.status, id]
        const livroAtualizado = await cliente.query(sql, values)

        await cliente.end()
        return livroAtualizado.rows[0]
    } catch (error) { throw error }
}

async function deletarLivro(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const sql = await cliente.query(`DELETE FROM livros WHERE livro_id = $1 RETURNING *`, [id])

        await cliente.end()
        return sql.rows[0]
    } catch (error) { throw error }
}

async function buscarAutorPorId(id) {
    const cliente = new Client(conexao)
    cliente.connect()

    try {
        const res = await cliente.query(`SELECT * FROM autores WHERE autor_id = $1`, [id])

        await cliente.end()
        return res.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    cadastrarLivros,
    indisponibilizaLivro,
    verificarDisponibilidade,
    buscarLivroPorNome,
    buscarLivroPorIsbn,
    buscarLivroPorId,
    disponibilizaLivro,
    buscarLivros,
    atualizarLivro,
    deletarLivro,
    buscarAutorPorId
}
