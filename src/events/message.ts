import { Message, TextChannel, DMChannel, NewsChannel } from 'discord.js';
import { sendRconCommand } from '../utils/rcon';

const COMMAND_PREFIX = '!';

export default async function messageCreate(message: Message) {
  if (message.author.bot) return;

  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (!(message.channel instanceof TextChannel || message.channel instanceof DMChannel || message.channel instanceof NewsChannel)) {
    return;
  }

  if (command === 'status') {
    try {
      const status = await sendRconCommand('list');

      if (!status) {
        return message.channel.send('Unable to retrieve server status. The response is empty.');
      }

      return message.channel.send(`Server status: ${status}`);
    } catch (error) {
      console.error('Error retrieving server status:', error);
      return message.channel.send('Failed to retrieve server status. Please try again later.');
    }
  }
}
