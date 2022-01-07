const dotenv = require('dotenv')
dotenv.config()

module.exports = async (client) => {

    //BOT LOGIN

    client.login(process.env.TOKEN)
    
    //ON READY

    client.on('ready', () => {
        console.log(`Connected to ${client.user.username}`)
        start()
    })

    //START

    async function start() {
        
        const cmdHandler = require('./handler.js')
        cmdHandler(client)

        const builder = require('./builder.js')
        builder(client)
    }
}