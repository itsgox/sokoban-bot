const Discord = require('discord.js')
const { Intents } = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

//CLIENT SETTINGS

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_PRESENCES]
})

//BOT LOGIN

client.login(process.env.TOKEN)
    
//ON READY

client.on('ready', () => {
    console.log(`Connected to ${client.user.username}`)
    start()
})

//START

async function start() {
    
    const handler = require('./base/handler.js')
    handler(client)

    const builder = require('./base/builder.js')
    builder(client)

    const status = require('./base/status.js')
    status(client)

    //NOT INCLUDED

    const logs = require('./base/logs.js')
    logs(client)
}