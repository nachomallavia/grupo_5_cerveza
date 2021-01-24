require('dotenv/config')
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASS,
    "database": process.env.BEERDB,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": process.env.PUERTO
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
