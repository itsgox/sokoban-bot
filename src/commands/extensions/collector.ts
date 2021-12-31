// @ts-nocheck
import Discord from 'discord.js'
import emojis from '../../config/emojis.json'

export const collector = async (client, int, Author, User, channel, guild, level, goals, lastReload, dataGrid, size, table, color, Player, startTime) => {

    const { genButtons } = await import('./buttons.ts')
    const { genTime } = await import('./time.ts')
    const { checkBox } = await import('./box.ts')
    const { newLevel } = await import('../play.ts')

    //COLLECTOR

    let message = await int.fetchReply()
    const movement = message.createMessageComponentCollector({ componentType: 'BUTTON' })
    movement.on('collect', async button => {

        button.deferUpdate()
        if (button.user.id !== Author.id) return
        let isStuck = false

        //NEXT LEVEL

        if (button.customId === 'restart') {
            movement.stop()
            await newLevel(client, int, Author, User, channel, guild, level, lastReload, size)
            return
        }
        else if (button.customId === 'next') {
            movement.stop()
            await newLevel(client, int, Author, User, channel, guild, level+1, lastReload, size)
            return
        }
        else if (button.customId === 'stop') {
            movement.stop()
            let visualGrid = dataGrid.map(x => x.emoji).join('')
            table.setDescription(visualGrid)
            int.editReply({
                embeds: [table],
                components: []
            })
            return
        }

        //SETTINGS

        let player = dataGrid.map(x => x.emoji).indexOf(Player)
        let around = [
            { id: 'left', position: player-1, data: dataGrid[player-1], next: (player-1)-1, nextData: dataGrid[(player-1)-1] },
            { id: 'up', position: player-size[0]-1, data: dataGrid[player-size[0]-1], next: (player-size[0]-1)-size[0]-1, nextData: dataGrid[(player-size[0]-1)-size[0]-1] },
            { id: 'down', position: player+size[0]+1, data: dataGrid[player+size[0]+1], next: (player+size[0]+1)+size[0]+1, nextData: dataGrid[(player+size[0]+1)+size[0]+1] },
            { id: 'right', position: player+1, data: dataGrid[player+1], next: (player+1)+1, nextData: dataGrid[(player+1)+1] },
        ]

        //MOVING

        let next = around.filter(x => x.id === button.customId)[0]
        if (next.data.type === 'box') {
            dataGrid.splice(next.next,1,{ emoji: emojis.box, type: 'box' })
        }
        dataGrid.splice(next.position,1,{ emoji: Player, type: 'player' })
        dataGrid.splice(player,1,{ emoji: emojis.blank, type: 'blank' })

        isStuck = await checkBox(dataGrid, size)

        let visualGrid = dataGrid.map(x => x.emoji).join('')
        table.setDescription(visualGrid)
        let buttons = await genButtons(dataGrid, size, Player, isStuck)

        if (next.nextData.emoji === emojis.goal && next.data.type === 'box') {
            goals--
            dataGrid.splice(next.next,1,{ emoji: `:${color.name}_square:`, type: 'border' })
            visualGrid = dataGrid.map(x => x.emoji).join('')
            table.setDescription(visualGrid)
            buttons = await genButtons(dataGrid, size, Player, isStuck)
            if (goals === 0) return endLevel()
        }

        int.editReply({
            embeds: [table],
            components: [buttons]
        })
    })

    //END LEVEL

    async function endLevel() {

        if (level === 5) {

            let table = new Discord.MessageEmbed()
            .setTitle(`${Author.username}'s Sokoban`.replace("s's","s'").replace("S's","S'"))
            .setDescription('Congrats! You finished the 5 Levels of the Game!')
            .setColor(color.hex)
    
            int.editReply({
                embeds: [table],
                components: []
            })
            return
        }

        let time = await genTime(Date.now()-startTime)
        
        let playerPos = dataGrid.indexOf(dataGrid.filter(x => x.type === 'player')[0])
        dataGrid.splice(playerPos,1,{ emoji: emojis.blank, type: 'blank' })
        let visualGrid = dataGrid.map(x => x.emoji).join('')
        table.setDescription(`${visualGrid}\nCongrats! You completed **Level ${level}** in **${time}**!`)

        let buttons = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Next Level')
            .setCustomId('next')
            .setStyle('SECONDARY'),
            new Discord.MessageButton()
            .setLabel('Stop')
            .setCustomId('stop')
            .setStyle('SECONDARY')
        )

        int.editReply({
            embeds: [table],
            components: [buttons]
        })
    }
}