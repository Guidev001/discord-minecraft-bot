import { Client } from 'discord.js';

export default function ready(client: Client) {
  console.log(`Bot is logged in as ${client.user?.tag}`);
}
