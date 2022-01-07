const Discord = require('discord.js')
const emojis = require('../../config/emojis.json')

module.exports = async (dataGrid, size, position) => {

    dataGrid.splice(position-size[0],1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position-size[0]-1,1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position-size[0]-2,1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position+size[0],1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position+size[0]+1,1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position+size[0]+2,1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position-1,1,{ emoji: emojis.blank, type: 'pre-border' })
    dataGrid.splice(position+1,1,{ emoji: emojis.blank, type: 'pre-border' })

    return dataGrid
}