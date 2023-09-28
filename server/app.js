const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  routes() {
    this.app.use("/users", require("../routes/users"));
    this.app.use("/products", require("../routes/products"));
    this.app.use("/planes", require("../routes/planes"));
    this.app.use("/turns", require("../routes/turns"));
    this.app.use("/comments", require("../routes/comments"));
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor en línea");
    });
  }
}

module.exports = Server;
