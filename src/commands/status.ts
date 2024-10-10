import { CommandInteraction } from 'discord.js';
import { sendRconCommand } from '../utils/rcon';

export async function statusCommand(interaction: CommandInteraction) {
  try {
    const status = await sendRconCommand('list');
    await interaction.reply(`Server status: ${status}`);
  } catch (error) {
    await interaction.reply('Failed to retrieve server status.');
  }
}
