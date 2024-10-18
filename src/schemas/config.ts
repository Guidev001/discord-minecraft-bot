import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const ConfigSchema = z.object({
  NODE_ENV: z.string().default("production"),
  DISCORD_TOKEN: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  GUILD_ID: z.string(),
  MINECRAFT_RCON_HOST: z.string().min(1),
  MINECRAFT_RCON_PORT: z.string().regex(/^\d+$/),
  MINECRAFT_RCON_PASSWORD: z.string().min(1),
  DATABASE_URL: z.string()
});

const config = ConfigSchema.parse(process.env);

export default config;
