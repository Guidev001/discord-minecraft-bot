"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ready_1 = __importDefault(require("./events/ready"));
const message_1 = __importDefault(require("./events/message"));
const config_1 = __importDefault(require("./config"));
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent]
});
(0, ready_1.default)(client);
client.on('messageCreate', message_1.default);
client.login(config_1.default.DISCORD_TOKEN);
