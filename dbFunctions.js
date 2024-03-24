const fs = require('fs')

function readDb(dbName = 'db.json') {
    try {
        if (!fs.existsSync(dbName)) {
            throw new Error('Database file does not exist');
        }
        const data = fs.readFileSync(dbName, 'utf8');
        
        if (!data.trim()) {
            throw new Error('Database file is empty');
        }
        
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error.message);
        return null; 
    }
}

function writeDb(obj, dbName = 'db.json') {
    if (!obj) return console.log('Please provide data to save')
    try {
        fs.writeFileSync(dbName, JSON.stringify(obj))
        return console.log('SAVE SUCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}


module.exports = { readDb, writeDb }