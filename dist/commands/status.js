"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCommand = statusCommand;
const rcon_1 = require("../utils/rcon");
async function statusCommand(interaction) {
    try {
        const status = await (0, rcon_1.sendRconCommand)('list');
        await interaction.reply(`Server status: ${status}`);
    }
    catch (error) {
        await interaction.reply('Failed to retrieve server status.');
    }
}
