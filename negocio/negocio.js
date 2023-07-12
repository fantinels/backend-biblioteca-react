const persistencia = require('../persistencia/persistencia')
const persistenciaC = require('../persistencia/cliente_persistencia')
const persistenciaL = require('../persistencia/livro_persistencia')

async function retirada(matricula_cliente, livro_id, data_retirada) {
    console.log('Verificando se este livro existe em nosso sistema ...');
    const livroExiste = await persistenciaL.buscarLivroPorId(livro_id)

    if (!livroExiste) {
        throw ({ status: 404, message: 'Livro NÃO existente! Tente novamente ...' })
    }
    console.log('Livro Existente! Prosseguindo ...')

    console.log('Verificando se você está cadastrado em nosso sistema ...');
    const clienteExiste = await persistenciaC.buscarClientePorMatricula(matricula_cliente)

    if (!clienteExiste) {
        throw ({ status: 404, message: 'Cadastrado NÃO econtrado! Tente novamente ...' })
    }
    console.log('Cadastrado Econtrado! Prosseguindo ...')

    console.log('Verificando se o livro está disponível ...')
    const livroDisp = await persistenciaL.verificarDisponibilidade(livro_id)

    if (!livroDisp) {
        throw ({ status: 400, message: 'Livro INDISPONÍVEL! Não pode ser retirado!' })
    }

    console.log('Verificando se você ainda tem limite para aluguel de livros ...')
    const limite = await persistenciaC.limiteLivroCliente(matricula_cliente)

    if (limite) {
        throw ({ status: 400, message: 'Limite máximo de livros alugados atingido ...' })
    }

    console.log('Limite liberado! Prosseguindo ...')

    console.log('Registrando o aluguel do livro ...');
    const retirada = await persistencia.retirada(matricula_cliente, livro_id, data_retirada)

    if (retirada) {
        console.log('Livro retirado com sucesso');
    }

    console.log('Contabilizando livro na conta do cliente...')
    const livroRetirado = await persistenciaC.contabilizaLivroCliente(matricula_cliente)

    if(livroRetirado) {
        console.log('Contabilizado com sucesso!')
    }

    console.log('Atualizando status do livro ...')
    const indisp = await persistenciaL.indisponibilizaLivro(livro_id)

    if (indisp) {
        console.log('Baixa realizada com sucesso!')
    }
}

async function devolucao(livro_id, data_devolucao, id_retirada, matricula) {

    console.log('Verificando se livro existe ... ')
    const livro = await persistenciaL.buscarLivroPorId(livro_id)
    if (!livro) {
        throw ({ status: 404, message: 'Livro NÃO existente! Tente novamente ...' })
    }

    console.log('Verificando se cliente existe ... ')
    const cliente = await persistenciaC.buscarClientePorMatricula(matricula)
    if (!cliente) {
        throw ({ status: 404, message: 'Cadastrado NÃO econtrado! Tente novamente ...' })
    }

    console.log('Verificando se este livro foi retirado ...')
    const retiradaLivro = await persistencia.buscarRetiradaId(id_retirada)
    if (!retiradaLivro) {
        throw ({status: 404, message: "Não há retirada registrada para este livro"})
    }

    console.log('Verificando devolução ... ')
    const devolucaoL = await persistencia.buscarDevolucao(id_retirada)
    if (devolucaoL) {
        throw ({ status: 400, message: 'Devolução já realizada!' })
    }

    console.log('Disponiblizando Livro ... ')
    await persistenciaL.disponibilizaLivro(livro_id)

    console.log('Atualizando limite cliente ... ')
    await persistenciaC.reduzLivroCliente(matricula)

    console.log('Registrando Devolução ... ')
    const livroDevolvido = await persistencia.devolucao(livro_id, data_devolucao, id_retirada, matricula)

    if (livroDevolvido) {
        throw ({status: 201, message: "Livro Devolvido com Sucesso!"})
    }
     
}
    
module.exports = {
    retirada,
    devolucao
}