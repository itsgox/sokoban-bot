const Discord = require('discord.js')
const emojis = require('../../config/emojis.json')

module.exports = async () => {

    let colors = [
        { name: "orange", hex: "#f4900d" },
        { name: "blue", hex: "#54acee" },
        { name: "red", hex: "#dd2e44" },
        { name: "purple", hex: "#a98ed6" },
        { name: "green", hex: "#78b059" },
        { name: "yellow", hex: "#fdcb58" }
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}