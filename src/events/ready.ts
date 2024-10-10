import { Client } from 'discord.js';

export default function ready(client: Client) {
  client.once('ready', () => {
    console.log(`Bot is logged in as ${client.user?.tag}`);
  });
}
