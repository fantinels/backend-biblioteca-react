const persistencia = require('../persistencia/livro_persistencia')

async function cadastrarLivros(livros) {

    const livro = await persistencia.buscarLivroPorIsbn(livros.isbn)
    const nome = await persistencia.buscarLivroPorNome(livros.nome)

    if (livro) {
        throw ({status: 400, message: "ISBN já cadastrado!"})
    }

    if (nome) {
        throw ({status: 400, message: "Nome já cadastrado!"})
    }
    
    if (livros && livros.isbn && livros.nome && livros.editora && livros.ano_publi && livros.status) {
        try {
            await persistencia.cadastrarLivros(livros)
            throw ({status: 201, message: "Livro Inserido com sucesso!"})
        } catch (error) { throw error }
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    } 
}

async function buscarLivroPorNome(nome) {
    try {
        const livroNome = await persistencia.buscarLivroPorNome(nome)

        if (!livroNome) {
            let erro = new Error()
            erro.message = "Nome do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroNome
    } catch (error) { throw error }
}

async function buscarLivroPorIsbn(isbn) {
    try {
        const livroIsbn = await persistencia.buscarLivroPorIsbn(isbn)

        if (!livroIsbn) {
            let erro = new Error()
            erro.message = "Isbn do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroIsbn
    } catch (error) { throw error }
}

async function buscarLivroPorId(livro_id) {
    try {
        const livroId = await persistencia.buscarLivroPorId(livro_id)

        if (!livroId) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroId
    } catch (error) { throw error }
}

async function buscarLivros() {
    try {
        let livro = await persistencia.buscarLivros()
        if (livro.length == 0   ) {
            let erro = new Error()
            erro.message = "Nenhum livro encontrado"
            erro.status = 404
            throw erro
        }
        return livro
    } catch (error) { throw error }
}

async function atualizarLivro(id, livro) {

    const isbnExiste = await persistencia.buscarLivroPorIsbn(livro.isbn)
    if (isbnExiste) {
        throw ({status: 400, message: "ISBN já cadastrado, tente novamente ..."})
    }
    
    const nomeExiste = await persistencia.buscarLivroPorNome(livro.nome)
    if (nomeExiste) {
        throw ({status: 400, message: "NOME já cadastrado, tente novamente ..."})
    }
    
    const autorId = await persistencia.buscarAutorPorId(livro.autor_id)
    if (!autorId) {
        throw ({status: 404, message: "ID do autor não encontrado"})
    }

    if (livro && livro.isbn && livro.nome && livro.autor_id && livro.editora && livro.ano_publi && livro.status) {
        const livroAtualizado = await persistencia.atualizarLivro(id, livro)
        if (!livroAtualizado) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroAtualizado
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste livro"
        erro.status = 400
        throw erro
    }
}

async function deletarLivro(id) {
    try {
        const livroDel = await persistencia.deletarLivro(id)

        if (!livroDel) {
            let erro = new Error()
            erro.message = "Id do livro não encontrado"
            erro.status = 404
            throw erro
        }

        return livroDel
    } catch (error) { throw error }
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