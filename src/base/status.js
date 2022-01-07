module.exports = async (client) => {

    async function setStatus() {
        client.user.setActivity('/play', { type: 'PLAYING' })
        setTimeout(setStatus,60000*60*2)
    }
    setStatus()
}