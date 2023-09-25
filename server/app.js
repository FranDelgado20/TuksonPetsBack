const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }
    middleware(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }
    routes(){
        this.app.use('/products', require('../routes/products'))
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor en línea")
        })
    }
}

module.exports = Server