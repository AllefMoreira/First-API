
const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    //pool é executado logo após a conexão
    // O comando "PRAGMA foreign_keys = ON" habilita a possibildiade de usar o DELETE em CASCADE

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") 
    },

    useNullAsDefault: true //propriedade padrão para o sqlite
  },
};
