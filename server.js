const express = require('express')
const bcrypt = require('bcrypt')
const path = require('path')
const db = require('./src/database')

const User= require('./src/models/user.js')

const bibliotecaRouter = require('./src/routes/biblioteca_router')
const masmorrasRouter = require('./src/routes/masmorras_router')

const app = express()
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/biblioteca', bibliotecaRouter)
app.use('/masmorras', masmorrasRouter)

app.get('/', (req, res) => {
    res.render('pages/login')
})

app.post('/login', async (req, res) => {

    console.log(req.body.email)
    console.log(req.body.password)


    User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
            console.log(user.password)
            bcrypt.hash(req.body.password, 12, (error, result)=> {

                if (error) {
                    console.log("Hash falhou.")
                    
                }

                console.log(result)
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if (err || !isMatch) {
                        console.log(user.password)
                        console.log("Senha incorreta.")
                    } else {
                        
                        res.redirect('/index')
                    }
                })
    
            })

    
        } else {
            console.log("Usuário não existe.")
        }
    }).catch(() => {
        console.log('ocorreu um erro')
    })

})

app.get('/register', (req, res) => {
    res.render('pages/register')
})

app.post('/register', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let passconfirm = req.body.passconfirm

    if (password == passconfirm) {

        bcrypt.hash(password, 12, (error, result)=> {

            if (error) {
                console.log("Hash falhou.")
            } else {
                console.log(result)
                User.create({
                    name: name,
                    email: email,
                    password: result
                }).then(()=>{
                    res.redirect('/')
                })
            }

        })

    } else {
        console.log("Senhas não batem.")
    }

    
})

app.get('/index', (req, res) => {
    res.render('pages/index')
    
})

// app.get('/masmorras', (req, res) => {
//     res.render('pages/masmorras/index')
    
// })

// app.get('/biblioteca', (req, res) => {
//     res.render('pages/biblioteca/index')
    
// })

app.listen(3000, async()=>{

    try {
        await db.sync({force: true})
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log("Spellcode")
    console.log("Versão 0.5")
})