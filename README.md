# Sokoban Bot

Sokoban is a popular game that I wanted to bring to Discord as a bot. I know PolyMars already did a bot like this, but i wanted to do my own version!

## Installation

To run your own **Sokoban Bot**, you will need to download the following npm packages:

```bash
npm install discord.js
npm install ts-node
npm install typescript
npm install dotenv
npm install nodemon
```

## Add your Token

Create a **.env** file outside the **src** folder, and add your **Token** next to "TOKEN=" like in the example.

```bash
TOKEN=your-token
```

## Add Server ID

Go to **src/config/commands.json** and set your **Server ID**.

```json
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