const Discord = require('discord.js')
const emojis = require('../../config/emojis.json')

module.exports = (milliseconds) => {

    let days = milliseconds / (1000*60*60*24)
    let absoluteDays = Math.floor(days)
    let d = absoluteDays > 9 ? absoluteDays : '0' + absoluteDays

    let hours = (days - absoluteDays) * 24
    let absoluteHours = Math.floor(hours)
    let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours

    let minutes = (hours - absoluteHours) * 60
    let absoluteMinutes = Math.floor(minutes)
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes

    let seconds = (minutes - absoluteMinutes) * 60
    let absoluteSeconds = Math.floor(seconds)
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

    let final = `${d}d ${h}h ${m}m ${s}s`
    if (final.startsWith('00d 00h 00m')) final = `${s}s`
    if (final.startsWith('00d 00h')) final = `${m}m ${s}s`
    if (final.startsWith('00d')) final = `${h}h ${m}m ${s}s`
    
    return final
}