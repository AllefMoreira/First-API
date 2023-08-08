const sqliteConnection = require('../../SQLITE')
const createUsers = require('./createUsers')

async function migrationsRun(){
    const schema = [
        createUsers
    ].join('')

    sqliteConnection().then(db => db.exec(schema))
    .catch(error => console.error(error))
}

module.exports = migrationsRun