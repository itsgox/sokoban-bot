// @ts-nocheck
import { SlashCommandBuilder } from '@discordjs/builders'
import commandList from '../config/commands.json'

export const builder = (client) => {

    //SETTINGS

    let guildID = commandList.settings['guildID']
    let type = commandList.settings['type']
    let commands = commandList.list.filter(x => x.name !== '')
    if (type === 'global') commands = commands.filter(x => x.folder !== 'admin')

    let position = 0
    do {
        let data = new SlashCommandBuilder()
        .setName(commands[position].name)
        .setDescription(commands[position].description.replaceAll('**',''))
        eval(`${type}${commands[position].action.charAt(0).toUpperCase()+commands[position].action.slice(1)}(data)`)
        position++
    }
    while (position < commands.length)

    //FUNCTIONS

    async function localAdd(data) {
        await client.guilds.cache.get(guildID)?.commands.create(data)
    }
    
    async function localRemove(data) {
        const command = await client.guilds.cache.get(guildID)?.commands.create(data)
        await client.guilds.cache.get(guildID)?.commands.delete(command.id)
    }

    async function globalAdd(data) {
        await client.application?.commands.create(data)
    }

    async function globalRemove(data) {
        const command = await client.application?.commands.create(data)
        await client.application?.commands.delete(command.id)
    }
}