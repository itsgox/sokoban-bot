const Discord = require('discord.js')
const emojis = require('../config/emojis.json')

module.exports = async (client, int, Author, User, channel, guild, level, size) => {

    const genGrid = require('./extensions/grid.js')
    const distance = require('./extensions/distance.js')
    const genColor = require('./extensions/color.js')
    const genPlayer = require('./extensions/player.js')
    const collector = require('./extensions/collector.js')
    const genButtons = require('./extensions/buttons.js')

    //SETTINGS

    let color = await genColor()
    let player = await genPlayer()
    let startTime = Date.now()
    if (!level) level = 1
    if (!size) size = [9,7]
    if (size[0] > 16) size = [16,size[1]]
    if (size[1] > 12) size = [size[0],12]
    let dataGrid = await genGrid(size[0],size[1], color)

    //POSITION GENERATOR

    async function positionGen() {
        let options = dataGrid.filter(x => x.type === 'blank').map(x => x.position)
        return options[Math.floor(Math.random() * options.length)]
    }

    //SPAWN GOAL

    async function spawnGoal() {
        let spawnedGoals = 0
        do {
            let position = await positionGen()
            dataGrid.splice(position,1,{ emoji: emojis.goal, type: 'border', position: position })
            dataGrid = await distance(dataGrid, size, position)
            spawnedGoals++
        }
        while (spawnedGoals < level)
        spawnBox()
    }
    spawnGoal()

    //SPAWN BOX

    async function spawnBox() {
        let spawnedBoxes = 0
        do {
            let position = await positionGen()
            dataGrid.splice(position,1,{ emoji: emojis.box, type: 'box', position: position })
            dataGrid = await distance(dataGrid, size, position)
            spawnedBoxes++
        }
        while (spawnedBoxes < level)
        spawnPlayer()
    }

    //SPAWN PLAYER

    async function spawnPlayer() {
        let position = await positionGen()
        dataGrid.splice(position,1,{ emoji: player, type: 'player', position: position })
        dataGrid = await distance(dataGrid, size, position)
        send()
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

        await collector(client, int, Author, User, channel, guild, level, level, dataGrid, size, table, color, player, startTime)
    }
}