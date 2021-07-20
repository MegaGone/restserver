const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      users       : "/api/users",
      auth        : '/api/auth',
      categories  : "/api/categories"
    }

    // BD Connection
    this.connectDB()

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // PARSE DATA
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use( this.paths.auth, require('../routes/auth') );
    this.app.use( this.paths.users, require("../routes/user"));
    this.app.use( this.paths.categories, require('../routes/categories'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server run on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
