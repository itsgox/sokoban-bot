// @ts-nocheck
import Discord from 'discord.js'
import emojis from '../../config/emojis.json'

export const genPlayer = async () => {

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