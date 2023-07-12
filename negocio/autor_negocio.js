const persistencia = require('../persistencia/autor_persistencia')

async function cadastrarAutores(autores) {
    if (autores && autores.nome && autores.pais_origem) {
        try {
            const autorInserido = await persistencia.cadastrarAutores(autores)
            return autorInserido
        } catch (error) { throw error }
    } else {
        let erro = new Error()
        erro.message = "Falta parâmetros deste autor"
        erro.status = 400
        throw erro
    }
}

async function buscarAutor() {
    try {
        const autor = await persistencia.buscarAutor()

        if (autor.length == 0) {
            let erro = new Error()
            erro.message = "Nenhum autor encontrado"
            erro.status = 404
            throw erro
        }
        return autor
    } catch (error) { throw error }
}

module.exports = {
    cadastrarAutores,
    buscarAutor
}