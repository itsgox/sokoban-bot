// @ts-nocheck
import dotenv from 'dotenv'
dotenv.config()

export const connect = async (client) => {

    //BOT LOGIN

    client.login(process.env.TOKEN)
    
    //ON READY

    client.on('ready', () => {
        console.log(`Connected to ${client.user.username}`)
        start()
    })

    //START

    async function start() {
        
        const { cmdHandler } = await import('./handler.ts')
        cmdHandler(client)

        const { builder } = await import('./builder.ts')
        builder(client)
    }
}