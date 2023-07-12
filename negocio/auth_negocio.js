const persistencia = require('../persistencia/auth_persistencia')

async function autenticacao(username, password) {
    if (!username && !password) {
        console.log("Usuário e senha obrigatórios!")
        throw ({status: 400, message: "Usuário e senha obrigatórios!"})
    } else {
        const authUser = await persistencia.autenticacao(username, password)
        if (authUser) {
            console.log('Usuário autenticado com sucesso!')
            throw ({status: 200, message: "Usuário autenticado com sucesso!"})
            // return true
        } else {
            console.log('Usuário ou senha inválidos!')
            throw ({status: 400, message: "Usuário ou senha inválidos!"})
        }
    }
}

module.exports = {
    autenticacao
}