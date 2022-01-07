const Discord = require('discord.js')
const { Intents } = require('discord.js')

//CLIENT SETTINGS

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS]
})

//CONNECTION

const connect = require('./base/connect.js')
connect(client)