// import db
const db = require('../data/db')

// export funcs
module.exports = { insert, get }

//funcs 
async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games').where({ id }).first()
}

async function get() {
    return db('games')
}