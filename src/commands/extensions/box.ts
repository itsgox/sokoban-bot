// @ts-nocheck
import Discord, { Channel } from 'discord.js'
import emojis from '../../config/emojis.json'

export const checkBox = async (dataGrid, size) => {
    
    //GET BOX POSITIONS

    let tempDataGrid = dataGrid.map(x => x)
    let positions = []
    let i = 0
    do {
        let block = tempDataGrid[i]
        if (block.type === 'box') {
            tempDataGrid.splice(i,1,{ emoji: emojis.blank, type: 'blank' })
            positions.push([i-1,i-size[0]-1,i+size[0]+1,i+1])
        }
        i++
    }
    while (i < tempDataGrid.length)

    //CHECK BLOCKS AROUND

    let isStuck = false
    let g = 0
    do {
        let types = positions[g].map(x => dataGrid[x])
        types = types.filter(x => x.isWall === true)
        if (types.length >= 1) {
            isStuck = true
            g = positions.length-1
        }
        g++
    }
    while (g < positions.length)

    return isStuck
}