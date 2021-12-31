// @ts-nocheck
import commands from '../config/commands.json'

export const cmdHandler = (client) => {
    
    client.on('interactionCreate', async int => {

        //SETTINGS

        if (!int.isCommand()) return
        let commandName = int.commandName
        let input
        if (int.options._hoistedOptions.length !== 0) input = int.options._hoistedOptions.map(x => x.value)
        let Author = int.user
        let User = int.options.getUser('user')
        let channel = int.channel
        let guild = int.guild

        //COMMANDS

        let commandList = commands.list
        if (!commandList.map(x => x.name).includes(`${commandName}`)) {
            int.reply({
                content: `The command **\`/${commandName}\` is currently under development...**`,
                ephemeral: true
            })
            return
        }

        //SEARCH FILE

        int.deferReply().then(() => search())

        async function search() {
            const path = `../commands/play.ts`
            const { newLevel } = await import(path)
            newLevel(client, int, Author, User, channel, guild, input)
        }
    })
}