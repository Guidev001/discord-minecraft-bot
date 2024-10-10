"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRconCommand = sendRconCommand;
const rcon_client_1 = require("rcon-client");
const config_1 = __importDefault(require("../config"));
async function sendRconCommand(command) {
    const rcon = await rcon_client_1.Rcon.connect({
        host: config_1.default.MINECRAFT_RCON_HOST,
        port: parseInt(config_1.default.MINECRAFT_RCON_PORT),
        password: config_1.default.MINECRAFT_RCON_PASSWORD
    });
    try {
        const response = await rcon.send(command);
        await rcon.end();
        return response;
    }
    catch (error) {
        await rcon.end();
        throw new Error('Failed to send RCON command');
    }
}
