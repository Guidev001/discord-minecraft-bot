// src/bot.ts

import { Client, GatewayIntentBits } from 'discord.js';
import config from './config';
import ready from './events/ready';
import interactionCreate from './events/interactionCreate';
import { registerCommands } from './commands/register';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', async () => {
  await registerCommands();
  ready(client);
});

client.on('interactionCreate', interactionCreate);

client.login(config.DISCORD_TOKEN);
