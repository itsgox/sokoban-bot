const Discord = require('discord.js')
const emojis = require('../../config/emojis.json')

module.exports = async (width, height, color) => {

    //SETTINGS

    let grid = []
    let lines = 0
    let i = 0
    do {
        let type = 'blank'
        let emoji = emojis.blank
        let isWall = false
        let last = false

        //GET BLOCK EMOJI & TYPE

        if (i < width) {
            type = 'border'
            emoji = `:${color.name}_square:`
            isWall = true
            if (i+1 === width) last = true
        }
        else if ((i+1)-(width*lines) === 1) {
            type = 'border'
            emoji = `:${color.name}_square:`
            isWall = true
        }
        else if (i === (width*lines)+(width-1)) {
            type = 'border'
            emoji = `:${color.name}_square:`
            isWall = true
            last = true
        }
        else if (i+1 >= (width*height)-(width-1) && i+1 <= width*height) {
            type = 'border'
            emoji = `:${color.name}_square:`
            isWall = true
        }

        //CREATE PRE-BORDER

        if (i !== 0) {
            if (type === 'blank') {
                let nearby = [i-1,i-width]
                if (lines === 0) nearby = [i-1]
                nearby = nearby.map(x => grid.filter(y => y.type !== 'break')[x].type)
                if (nearby.includes('border') || i === (width*lines)+(width-2) || lines+2 === height) type = 'pre-border'
            }
        }

        //ADD BLOCK TO GRID
        
        grid.push({ emoji: emoji, type: type, isWall: isWall, position: grid.length })
        if (last) {
            grid.push({ emoji: '\n', type: 'break', isWall: false, position: grid.length })
            lines++
        }
        i++
    }
    while (i < width*height)
    
    return grid
}