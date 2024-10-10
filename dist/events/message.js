"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = messageCreate;
const discord_js_1 = require("discord.js");
const rcon_1 = require("../utils/rcon");
const COMMAND_PREFIX = '!';
async function messageCreate(message) {
    if (message.author.bot)
        return;
    if (!message.content.startsWith(COMMAND_PREFIX))
        return;
    const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (!(message.channel instanceof discord_js_1.TextChannel || message.channel instanceof discord_js_1.DMChannel || message.channel instanceof discord_js_1.NewsChannel)) {
        return;
    }
    if (command === 'status') {
        try {
            const status = await (0, rcon_1.sendRconCommand)('list');
            if (!status) {
                return message.channel.send('Unable to retrieve server status. The response is empty.');
            }
            return message.channel.send(`Server status: ${status}`);
        }
        catch (error) {
            console.error('Error retrieving server status:', error);
            return message.channel.send('Failed to retrieve server status. Please try again later.');
        }
    }
}
