const express = require('express')
const app = express()
const mysql = require('mysql')
const faker = require('faker')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'join_us'
})

app.get('/', (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM users"
    connection.query(q, (err, results) => {
        if(err) {
            throw err
        }
        res.send(`We have ${results[0].count} users!`)
    })
})

app.listen(3000, () => {
    console.log('funciona!')
})