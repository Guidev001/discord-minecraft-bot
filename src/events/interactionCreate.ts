import { Interaction } from 'discord.js';
import { statusSlashCommand } from '../commands/slash/server/public/status';
import { createCommand } from '../commands/slash/server/moderation/create';

export default async function interactionCreate(interaction: Interaction) {
  console.log('Received interaction:', interaction);

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  console.log('Command received:', commandName);

  switch (commandName) {
    case 'status':
      await statusSlashCommand(interaction);
      break;
    case 'create':
      await createCommand(interaction);
      break;
    default:
      break;
  }
}

