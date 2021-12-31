// @ts-nocheck
import Discord from 'discord.js'
import emojis from '../config/emojis.json'
import { collector } from './extensions/collector'

export const newLevel = async (client, int, Author, User, channel, guild, level, lastReload, size) => {

    const { genGrid } = await import('./extensions/grid.ts')
    const { distance } = await import('./extensions/distance.ts')
    const { genColor } = await import('./extensions/color.ts')
    const { genPlayer } = await import('./extensions/player.ts')
    const { collector } = await import('./extensions/collector.ts')
    const { genButtons } = await import('./extensions/buttons.ts')

    //SETTINGS

    let color = await genColor()
    let player = await genPlayer()
    let startTime = Date.now()
    if (!size) size = [15,10]
    if (!level) level = 1
    if (!lastReload) lastReload = 0
    if (level === lastReload+5) {
        if (level <= 10) {
            lastReload = level
            size = [size[0]+1,size[1]+1]
            if (size[0] >= 17) size = [17,size[1]]
            if (size[1] >= 11) size = [size[0],11]
        }
    }
    let dataGrid = await genGrid(size[0],size[1], color)

    //SPAWN GOAL

    let spawnedGoals = 0
    async function spawnGoal() {
        let position = Math.floor(Math.random() * (size[0]*size[1]))
        if (dataGrid[position].type !== 'blank') spawnGoal()
        else {
            dataGrid.splice(position,1,{ emoji: emojis.goal, type: 'border' })
            dataGrid = await distance(dataGrid, size, position)
            spawnedGoals++
            if (spawnedGoals === level) spawnBox()
            else spawnGoal()
        }
    }
    spawnGoal()

    //SPAWN BOX

    let spawnedBoxes = 0
    async function spawnBox() {
        let position = Math.floor(Math.random() * (size[0]*size[1]))
        if (dataGrid[position].type !== 'blank') spawnBox()
        else {
            dataGrid.splice(position,1,{ emoji: emojis.box, type: 'box' })
            dataGrid = await distance(dataGrid, size, position)
            spawnedBoxes++
            if (spawnedBoxes === level) spawnPlayer()
            else spawnBox()
        }
    }

    //SPAWN PLAYER

    async function spawnPlayer() {
        let position = Math.floor(Math.random() * (size[0]*size[1]))
        if (dataGrid[position].type !== 'blank') spawnPlayer()
        else {
            dataGrid.splice(position,1,{ emoji: player, type: 'player' })
            dataGrid = await distance(dataGrid, size, position)
            send()
        }
    }

    //SEND GAME

    async function send() {

        let visualGrid = dataGrid.map(x => x.emoji).join('')
        
        let table = new Discord.MessageEmbed()
        .setTitle(`${Author.username}'s Sokoban - Level ${level}`.replace("s's","s'").replace("S's","S'"))
        .setDescription(visualGrid)
        .setColor(color.hex)

        let buttons = await genButtons(dataGrid, size, player, false)
        
        int.editReply({
            embeds: [table],
            components: [buttons]
        })

        //START COLLECTOR

        await collector(client, int, Author, User, channel, guild, level, level, lastReload, dataGrid, size, table, color, player, startTime)
    }
}