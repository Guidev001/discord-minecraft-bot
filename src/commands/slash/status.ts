import { CommandInteraction } from 'discord.js';
import { sendRconCommand } from '../../utils/rcon';

export async function statusSlashCommand(interaction: CommandInteraction) {
  try {
    const status = await sendRconCommand('list');
    if (!status) {
      return interaction.reply('Unable to retrieve server status. The response is empty.');
    }

    await interaction.reply(`Server status: ${status}`);
  } catch (error) {
    console.error('Error retrieving server status:', error);
    await interaction.reply('Failed to retrieve server status. Please try again later.');
  }
}
