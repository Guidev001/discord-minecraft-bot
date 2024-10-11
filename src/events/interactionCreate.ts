import { Interaction } from 'discord.js';
import { statusSlashCommand } from '../commands/slash/status';

export default async function interactionCreate(interaction: Interaction) {
  console.log('Received interaction:', interaction);

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  console.log('Command received:', commandName);

  if (commandName === 'status') {
    console.log('Executing status command...');
    await statusSlashCommand(interaction);
  }
}

