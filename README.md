# Sokoban Bot

Sokoban is a popular game that I wanted to bring to Discord as a bot. I know PolyMars already did a bot like this, but I wanted to do my own version!

You can add my 24/7 [Sokoban Bot](https://itsgox.com/sokoban), or you can run your own version of the bot following the next steps!

## Installation

To run your own **Sokoban Bot**, you will need **Node and NPM** installed, the [bot files](https://github.com/itsgox/sokoban-bot/releases), and a few NPM packages.<br>
To installed them use:

```bash
npm install discord.js @discordjs/builders
npm install ts-node
npm install typescript
npm install dotenv
```
or just
```bash
npm install discord.js @discordjs/builders ts-node typescript dotenv
```

## Add your Token & Server ID

Change the **.env.example** file to **.env**<br>
Add your **Bot Token** & **Server ID**.

```bash
TOKEN=123456789
SERVER_ID=123456789
```
*This is just an example, add your own Token & ID*

## Usage

To run the bot, just use this command on the terminal:

```bash
sh start.sh
```
or
```bash
ts-node src/index.ts
```

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)