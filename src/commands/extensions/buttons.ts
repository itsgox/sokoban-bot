// @ts-nocheck
import Discord from 'discord.js'
import emojis from '../../config/emojis.json'

export const genButtons = async (dataGrid, size, Player, isStuck) => {

    let player = dataGrid.map(x => x.emoji).indexOf(Player)
    let around = [
        { emoji: '◄', id: 'left', type: dataGrid[player-1].type, nextData: dataGrid[(player-1)-1] },
        { emoji: '▲', id: 'up', type: dataGrid[player-size[0]-1].type, nextData: dataGrid[(player-size[0]-1)-size[0]-1] },
        { emoji: '▼', id: 'down', type: dataGrid[player+size[0]+1].type, nextData: dataGrid[(player+size[0]+1)+size[0]+1] },
        { emoji: '►', id: 'right', type: dataGrid[player+1].type, nextData: dataGrid[(player+1)+1] }
    ]

    let buttons = []
    let i = 0
    do {

        let isDisabled = false
        if (around[i].type === 'border') isDisabled = true
        if (around[i].type !== 'border') {
            if (around[i].nextData.type === 'border' && around[i].nextData.emoji !== emojis.goal && around[i].type === 'box') isDisabled = true
            if (around[i].nextData.type === 'box' && around[i].type === 'box') isDisabled = true
        }
    
        let button = new Discord.MessageButton()
        .setLabel(around[i].emoji)
        .setCustomId(around[i].id)
        .setStyle('SECONDARY')
        .setDisabled(isDisabled)

        buttons.push(button)
        i++
    }
    while (i < around.length)
    
    let buttons_ = new Discord.MessageActionRow()
    .addComponents(buttons[0],buttons[1],buttons[2],buttons[3])

    if (isStuck) {
        buttons_ = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel('Restart')
            .setCustomId('restart')
            .setStyle('DANGER')
        )
    }

    return buttons_
}