const express = require('express')

class Server{
    constructor(){
        this.app = express()
    }
    listen(){
        this.app.listen(1944, () => {
            console.log("Servidor en línea")
        })
    }
}

module.exports = Server