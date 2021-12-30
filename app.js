const express = require('express')
const mysql = require('mysql')
const faker = require('faker')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'join_us'
})

app.get('/', (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM users"
    connection.query(q, (err, results) => {
        if (err) {
            throw err
        } else {
            let count = results[0].count
            res.render('home', {count: count})
        }
    })
})

app.post('/register', (req, res) => {
    const user = {
        email: req.body.email
    }
    const q = 'INSERT INTO users SET ?'


    connection.query(q, user, (err, result) => {
        if(err) {
            throw err
        }
        res.redirect('/')
    })
    
})

app.listen(3000, () => {
    console.log('funciona!')
})