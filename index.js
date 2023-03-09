// imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const port = 3000;

//  express
const app = express()

// configurar o handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use('/publico', express.static(__dirname + '/publico'))

// rotas
app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

app.get('/dados', (req, res) => {
    res.render('dados', { layout: false })
})

app.get('/home', (req, res) => {
    res.render('home', { layout: false })
})

app.get('/squad', (req, res) => {
    res.render('squad', { layout: false })
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro', { layout: false })
})


//rota do buscar
app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })
})

app.use(
    express.urlencoded({
        extended: true
    })
)

// inserir dados na tabela clientes
app.post('/clie/insertclie', (req, res) => {
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const endereco_cliente = req.body.endereco_cliente
    const id_do_emprestimo = req.body.id_do_emprestimo
    const numero_do_cartao = req.body.numero_do_cartao
    const id_da_agencia = req.body.id_da_agencia

    const sql = `INSERT INTO clientes (nome_cliente,cpf,email,telefone,endereco_cliente,id_do_emprestimo,numero_do_cartao,id_da_agencia) VALUES ('${nome_cliente}','${cpf}','${email}','${telefone}','${endereco_cliente}','${id_do_emprestimo}','${numero_do_cartao}','${id_da_agencia}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela clientes
app.get('/clie', (req, res) => {

    const sql = 'SELECT * FROM clientes'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('clie', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela clientes
app.get('/clie/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente

    const sql = `SELECT * FROM clientes WHERE id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarClie = data[0]
        res.render('clientes', { layout: false, listarClie })
    })
})

// pegando para editar registro da tabela clientes
app.get('/clie/edit/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente
    const sql = `SELECT * FROM clientes where id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const clie = data[0]
        res.render('edit', { layout: false, clie })
    })
})

// editando o registro com post na tabela clientes
app.post('/clie/updateclie', (req, res) => {
    const id_do_cliente = req.body.id_do_cliente
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const endereco_cliente = req.body.endereco_cliente
    const id_do_emprestimo = req.body.id_do_emprestimo
    const numero_do_cartao = req.body.numero_do_cartao
    const id_da_agencia = req.body.id_da_agencia

    const sql = `UPDATE clientes SET nome_cliente = '${nome_cliente}', cpf = '${cpf}', email = '${email}', telefone = '${telefone}', endereco_cliente = '${endereco_cliente}', id_do_emprestimo = '${id_do_emprestimo}', numero_do_cartao = '${numero_do_cartao}', id_da_agencia = '${id_da_agencia}' WHERE id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/clie')
    })
})

// deletar registro da tabela clientes
app.get('/clie/remove/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente

    const sql = `DELETE FROM clientes WHERE id_do_cliente = '${id_do_cliente}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/clie')
    })
})

// busca de resgistro da tabela clientes
//rota de busca (busc) que enviar para view cliente cliente.handlebars
app.post('/busc/', (req, res) => {
    const cpf = req.body.cpf

    const sql = `SELECT * FROM clientes WHERE cpf = ${cpf}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarClie = data[0]
        res.render('clientes', { layout: false, listarClie })
    })
})

// inserir dados na tabela emprestimo
app.post('/emp/insertemp', (req, res) => {
    const cpf = req.body.cpf
    const emprestimo = req.body.emprestimo
    const parcelas = req.body.parcelas
    const juros = req.body.juros
    const data = req.body.data
    const sql = `INSERT INTO emprestimo (cpf,valor_emprestimo,parcelas,juros,data) VALUES ('${cpf}','${emprestimo}','${parcelas}','${juros}','${data}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela emprestimo
app.get('/emp', (req, res) => {

    const sql = 'SELECT * FROM emprestimo'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('emp', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela emprestimo
app.get('/emp/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo

    const sql = `SELECT * FROM emprestimo WHERE id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarEmp = data[0]
        res.render('emprestimo', { layout: false, listarEmp })
    })
})

// pegando para editar registro da tabela emprestimo
app.get('/emp/editE/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo
    const sql = `SELECT * FROM emprestimo where id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const emp = data[0]
        res.render('editE', { layout: false, emp })
    })
})

// editando o registro com post na tabela emprestimo
app.post('/emp/updateemp', (req, res) => {
    const id_do_emprestimo = req.body.id_do_emprestimo
    const cpf = req.body.cpf
    const valor = req.body.emprestimo
    const parcelas = req.body.parcelas
    const juros = req.body.juros
    const data = req.body.data

    const sql = `UPDATE emprestimo SET cpf = '${cpf}', valor_emprestimo = '${valor}', parcelas = '${parcelas}', juros = '${juros}', data = '${data}' WHERE id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/emp')
    })
})

// deletar registro da tabela emprestimo
app.get('/emp/remove/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo

    const sql = `DELETE FROM emprestimo WHERE id_do_emprestimo = '${id_do_emprestimo}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/emp')
    })
})

// busca de resgistro da tabela emprestimo
//rota de busca (busque) que enviar para view emprestimo.handlebars
app.post('/busque/', (req, res) => {
    const cpf = req.body.emprestimo

    const sql = `SELECT * FROM emprestimo WHERE cpf = ${cpf}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarEmp = data[0]
        res.render('emprestimo', { layout: false, listarEmp })
    })
})


// inserir dados na tabela agencia
app.post('/age/insertage', (req, res) => {
    const id_da_agencia = req.body.id_da_agencia
    const endereco = req.body.endereco
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `INSERT INTO agencia (endereco,email,telefone,id_da_agencia) VALUES ('${endereco}','${email}','${telefone}','${id_da_agencia}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela agencia
app.get('/age', (req, res) => {

    const sql = 'SELECT * FROM agencia'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('age', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) na tabela agencia
app.get('/age/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia

    const sql = `SELECT * FROM agencia WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarAge = data[0]
        res.render('agencia', { layout: false, listarAge })
    })
})

// pegando para editar registro da tabela agencia
app.get('/age/editA/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia
    const sql = `SELECT * FROM agencia where id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const age = data[0]
        res.render('editA', { layout: false, age })
    })
})

// editando o registro com post na tabela agencia
app.post('/age/updateage', (req, res) => {
    const id_da_agencia = req.body.id_da_agencia
    const endereco = req.body.endereco
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `UPDATE agencia SET endereco = '${endereco}', email = '${email}', telefone = '${telefone}' WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/age')
    })
})

// deletar registro da tabela agencia
app.get('/age/remove/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia

    const sql = `DELETE FROM agencia WHERE id_da_agencia = '${id_da_agencia}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/age')
    })
})

// busca de resgistro na tabela agencia
//rota de busca (busque) que enviar para view emprestimo.handlebars
app.post('/buscaA/', (req, res) => {
    const id_da_agencia = req.body.id_da_agencia

    const sql = `SELECT * FROM agencia WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarAge = data[0]
        res.render('agencia', { layout: false, listarAge })
    })
})


// inserir dados na tabela funcionarios
app.post('/fun/insertfun', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const cargo = req.body.cargo

    const sql = `INSERT INTO funcionarios (nome,cpf,email,telefone,cargo) VALUES ('${nome}','${cpf}','${email}','${telefone}','${cargo}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela funcionarios
app.get('/fun', (req, res) => {

    const sql = 'SELECT * FROM funcionarios'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('fun', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) na tabela funcionarios
app.get('/fun/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario

    const sql = `SELECT * FROM funcionarios WHERE id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarFun = data[0]
        res.render('funcionarios', { layout: false, listarFun })
    })
})

// pegando para editar registro da tabela funcionarios
app.get('/fun/editF/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario
    const sql = `SELECT * FROM funcionarios where id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const fun = data[0]
        res.render('editF', { layout: false, fun })
    })
})

// editando o registro com post na tabela funcionarios
app.post('/fun/updatefun', (req, res) => {
    const id_funcionario = req.body.id_funcionario
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const cargo = req.body.cargo

    const sql = `UPDATE funcionarios SET nome = '${nome}', cpf = '${cpf}', email = '${email}', telefone = '${telefone}', cargo = '${cargo}' WHERE id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/fun')
    })
})

// deletar registro da tabela funcionarios
app.get('/fun/remove/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario

    const sql = `DELETE FROM funcionarios WHERE id_funcionario = '${id_funcionario}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/fun')
    })
})

// busca de resgistro na tabela funcionarios
//rota de busca (busque) que enviar para view funcionarios.handlebars
app.post('/buscaF/', (req, res) => {
    const id_funcionario = req.body.id_funcionario

    const sql = `SELECT * FROM funcionarios WHERE cpf = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarFun = data[0]
        res.render('funcionarios', { layout: false, listarFun })
    })
})


// inserir dados na tabela cartao
app.post('/cartao/insertcartao', (req, res) => {
    const numero_do_cartao = req.body.numero_do_cartao
    const coddeseg = req.body.coddeseg
    const dataexp = req.body.dataexp
    const tipodecartao = req.body.tipodecartao
    const limitecartao = req.body.limitecartao
    const saldocartao = req.body.saldocartao
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const sql = `INSERT INTO cartao (numero_do_cartao,coddeseg, dataexp, tipodecartao, limitecartao, saldocartao, nome_cliente, cpf) VALUES ( '${numero_do_cartao}','${coddeseg}','${dataexp}','${tipodecartao}','${limitecartao}','${saldocartao}','${nome_cliente}','${cpf}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela cartao
app.get('/cart', (req, res) => {
    const sql = 'SELECT * FROM cartao'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('cart', { layout: false, listar })
    })
})


// consulta um registro pelo id_do_cartao (cartao.handlebars) na tabela cartao
app.get('/cartao/:id_do_cartao', (req, res) => {
    const id_do_cartao = req.params.id_do_cartao

    const sql = `SELECT * FROM cartao WHERE id_do_cartao = ${id_do_cartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCartao = data[0]
        res.render('cartao', { layout: false, listarCartao })
    })
})

// pegando para editar registro da tabela cartao
app.get('/cartao/editCart/:id_do_cartao', (req, res) => {
    const id_do_cartao = req.params.id_do_cartao

    const sql = `SELECT * FROM cartao WHERE id_do_cartao = ${id_do_cartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const cartao = data[0]
        res.render('editCart', { layout: false, cartao })
    })
})

// editando o registro com post na tabela cartao
app.post('/alterar/updateclient', (req, res) => {
    const id_do_cartao = req.body.id_do_cartao
    const numero_do_cartao = req.body.numero_do_cartao
    const coddeseg = req.body.coddeseg
    const dataexp = req.body.dataexp
    const tipodecartao = req.body.tipodecartao
    const limitecartao = req.body.limitecartao
    const saldocartao = req.body.saldocartao
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const sql = `UPDATE cartao SET numero_do_cartao = '${numero_do_cartao}', coddeseg = '${coddeseg}', dataexp = '${dataexp}', tipodecartao = '${tipodecartao}', limitecartao= '${limitecartao}', saldocartao = '${saldocartao}', nome_cliente = '${nome_cliente}', cpf = '${cpf}' WHERE id_do_cartao = '${id_do_cartao}' `

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect(`/cartao/${id_do_cartao}`)
        console.log("Alterado com sucesso")
    })
})

// deletar registro da tabela cartao
app.get('/cartao/remove/:id_do_cartao', (req, res) => {
    const id_do_cartao = req.params.id_do_cartao

    const sql = `DELETE FROM cartao WHERE id_do_cartao = ${id_do_cartao} `

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cart')
        console.log("excluido com sucesso")
    })
})

// busca de resgistro na tabela cartao
app.post('/buscacart/', (req, res) => {
    const id_do_cartao = req.body.id_do_cartao

    const sql = `SELECT * FROM cartao WHERE numero_do_cartao = ${id_do_cartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCartao = data[0]
        res.render('cartao', { layout: false, listarCartao })
    })
})



// inserir dados na tabela contas
app.post('/cont/insertcont', (req, res) => {
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const tipo_de_conta = req.body.tipo_de_conta
    const saldo = req.body.saldo
    const id_da_agencia = req.body.id_da_agencia
    const numero_da_conta = req.body.id_da_conta

    const sql = `INSERT INTO contas (id_da_conta,nome_cliente,cpf,tipo_de_conta,saldo,id_da_agencia) VALUES ('${numero_da_conta}','${nome_cliente}','${cpf}','${tipo_de_conta}','${saldo}','${id_da_agencia}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/home')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela contas
app.get('/cont', (req, res) => {

    const sql = 'SELECT * FROM contas'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('cont', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela contas
app.get('/cont/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta

    const sql = `SELECT * FROM contas WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCont = data[0]
        res.render('contas', { layout: false, listarCont })
    })
})


// pegando para editar registro da tabela contas
app.get('/cont/editCont/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta
    const sql = `SELECT * FROM contas where id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const cont = data[0]
        res.render('editCont', { layout: false, cont })
    })
})


// editando o registro com post na tabela contas
app.post('/cont/updatecont', (req, res) => {
    const id_da_conta = req.body.id_da_conta
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const tipo_de_conta = req.body.tipo_de_conta
    const saldo = req.body.saldo
    const id_da_agencia = req.body.id_da_agencia

    const sql = `UPDATE contas SET nome_cliente = '${nome_cliente}', cpf = '${cpf}', tipo_de_conta = '${tipo_de_conta}', saldo = '${saldo}', id_da_agencia = '${id_da_agencia}' WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cont')
    })
})

// deletar registro da tabela contas
app.get('/cont/remove/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta

    const sql = `DELETE FROM contas WHERE id_da_conta = '${id_da_conta}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cont')
    })
})

// busca de resgistro da tabela contas
app.post('/buscconta/', (req, res) => {
    const id_da_conta = req.body.id_da_conta

    const sql = `SELECT * FROM contas WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCont = data[0]
        res.render('contas', { layout: false, listarCont })
    })
})


app.post('/login', (req, res) => {
    const email = req.body.email;
    const cpf = req.body.cpf;

    conn.query('SELECT * FROM funcionarios WHERE email = ? AND cpf = ?', [email, cpf], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            // Usuário autenticado com sucesso;
            res.redirect('/home');
            res.render('home')
        } else {
            // Falha na autenticação;
            res.redirect('/')
        }
    })
});
   






// comando do professor de busca 03/03/2023

// busca por nome ou parte dele
// app.post('/buscnome/', (req, res) => {
//     const id = req.body.nome
//     const sql = `SELECT * FROM produto WHERE nome like '${id}%'`

//     conn.query(sql, function(err, data){
//        if(err){
//        console.log(err)
//         return
//       }

//        const listarProd = data
//        res.render('produto', {  layout: false, listarProd } )
//        }
//        )

//       })




//conexao com o banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'economicfit'

})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log("Conectado com sucesso!")
});

// servidor
app.listen(port, () => {
    console.log(`app rodando ${port}`)
});


