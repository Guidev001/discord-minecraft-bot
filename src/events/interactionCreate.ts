import { Interaction } from 'discord.js';
import { statusSlashCommand } from '../commands/slash/server/public/status';

export default async function interactionCreate(interaction: Interaction) {
  console.log('Received interaction:', interaction);

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  console.log('Command received:', commandName);

  switch (commandName) {
    case 'status':
      console.log('Executing status command...');
      await statusSlashCommand(interaction);
      break;
    // case 'create':
    //   console.log('Executing status command...');
    //   await createCommand(interaction);
    //   break;
    default:
      break;
  }
}

