"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ready;
function ready(client) {
    client.once('ready', () => {
        console.log(`Bot is logged in as ${client.user?.tag}`);
    });
}
