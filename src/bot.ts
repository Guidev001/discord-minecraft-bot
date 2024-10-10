import { Client, GatewayIntentBits } from 'discord.js';
import ready from './events/ready';
import messageCreate from './events/message';
import config from './config';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

ready(client);
client.on('messageCreate', messageCreate);

client.login(config.DISCORD_TOKEN);
