// @ts-nocheck
import { SlashCommandBuilder } from '@discordjs/builders'
import commandList from '../config/commands.json'
import dotenv from 'dotenv'
dotenv.config()

export const builder = (client) => {

    //SETTINGS

    let guildID = process.env.SERVER_ID
    let commands = commandList.list.filter(x => x.name !== '')
    
    let position = 0
    do {
        let data = new SlashCommandBuilder()
        .setName(commands[position].name)
        .setDescription(commands[position].description.replaceAll('**',''))
        eval(`${commands[position].action.charAt(0).toUpperCase()+commands[position].action.slice(1)}(data)`)
        position++
    }
    while (position < commands.length)

    //FUNCTIONS

    async function Add(data) {
        await client.guilds.cache.get(guildID)?.commands.create(data)
    }
    
    async function Remove(data) {
        const command = await client.guilds.cache.get(guildID)?.commands.create(data)
        await client.guilds.cache.get(guildID)?.commands.delete(command.id)
    }
}