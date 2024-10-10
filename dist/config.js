"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ConfigSchema = zod_1.z.object({
    DISCORD_TOKEN: zod_1.z.string().min(1),
    MINECRAFT_RCON_HOST: zod_1.z.string().min(1),
    MINECRAFT_RCON_PORT: zod_1.z.string().regex(/^\d+$/),
    MINECRAFT_RCON_PASSWORD: zod_1.z.string().min(1)
});
const config = ConfigSchema.parse(process.env);
exports.default = config;
