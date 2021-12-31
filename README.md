# Sokoban Bot

Sokoban is a popular game that I wanted to bring to Discord as a bot. I know PolyMars already did a bot like this, but I wanted to do my own version!

You can add my 24/7 [Sokoban Bot](https://itsgox.com/sokoban), or you can run your own version of the bot following the next steps!

## Installation

To run your own **Sokoban Bot**, you will need to download the files from this repository, and the following npm packages:

```bash
npm install discord.js
npm install ts-node
npm install typescript
npm install dotenv
npm install nodemon
```

## Add your Token

Create a **.env** file outside the **src** folder, and add your bot's **token** next to "TOKEN=" like in the example.

```bash
TOKEN=your-token
```

## Add Server ID

Go to **src/config/commands.json** and set your **Server ID**.

```bash
...
    "settings": { "guildID": "your-id" }
}
```

## Usage

To run the bot, just use this command on the terminal:

```bash
sh start.sh
```
or
```bash
npx nodemon src/sokoban.ts
```

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)