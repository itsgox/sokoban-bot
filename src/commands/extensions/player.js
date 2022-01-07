const Discord = require('discord.js')
const emojis = require('../../config/emojis.json')

module.exports = async () => {

    let emojis = [
        ':grin:',
        ':joy:',
        ':upside_down:',
        ':nerd:',
        ':face_with_raised_eyebrow:',
        ':scream:',
        ':flushed:'
    ]

    return emojis[Math.floor(Math.random() * emojis.length)]
}