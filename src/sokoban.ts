// @ts-nocheck
import Discord, { Intents } from 'discord.js'

//CLIENT SETTINGS

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS]
})

//CONNECTION

async function connect_() {
    const { connect } = await import('./base/connect.ts')
    connect(client)
}
connect_()