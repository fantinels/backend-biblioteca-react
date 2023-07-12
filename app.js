const express = require('express')
const rota = require('./rota/rota')
const rotaLivro = require('./rota/livro_rota')
const rotaCliente = require('./rota/cliente_rota')
const rotaAutor = require('./rota/autor_rota')
const rotaLogin = require('./rota/login_rota')
const authMiddleware = require('./middleware/auth_middleware')

const app = express()
const port = 5000

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use("/api/login", rotaLogin); 


// app.use(authMiddleware.verificarToken);
app.use("/api/aluguel", rota)
app.use("/api/livros", rotaLivro)
app.use("/api/autor", rotaAutor)
app.use("/api/clientes", rotaCliente)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})