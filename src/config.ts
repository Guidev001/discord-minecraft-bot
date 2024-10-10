import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const ConfigSchema = z.object({
  DISCORD_TOKEN: z.string().min(1),
  MINECRAFT_RCON_HOST: z.string().min(1),
  MINECRAFT_RCON_PORT: z.string().regex(/^\d+$/),
  MINECRAFT_RCON_PASSWORD: z.string().min(1),
  DATABASE_URL: z.string()
});

const config = ConfigSchema.parse(process.env);

export default config;
