const { SlashCommandBuilder } = require('@discordjs/builders')
const commandList = require('../config/commands.json')
const dotenv = require('dotenv')
dotenv.config()

module.exports = (client) => {

    //SETTINGS

    let guildID = process.env.SERVER_ID
    let commands = commandList.list.filter(x => x.name !== '')
    
    let position = 0
    do {
        let data = new SlashCommandBuilder()
        .setName(commands[position].name)
        .setDescription(commands[position].description.replaceAll('**',''))
        eval(`${commands[position].action}(data)`)
        position++
    }
    while (position < commands.length)

    //FUNCTIONS

    async function add(data) {
        await client.guilds.cache.get(guildID)?.commands.create(data)
    }
    
    async function remove(data) {
        const command = await client.guilds.cache.get(guildID)?.commands.create(data)
        await client.guilds.cache.get(guildID)?.commands.delete(command.id)
    }
}