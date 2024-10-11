import { REST, Routes } from 'discord.js';
import config from '../schemas/config';

const commands = [
  {
    name: 'create',
    description: 'Create a Minecraft server',
    options: [
      {
        name: 'name',
        description: 'The name of the server',
        type: 3, // STRING
        required: true
      },
      {
        name: 'version',
        description: 'Minecraft version',
        type: 3, // STRING
        required: true
      },
      {
        name: 'maxplayers',
        description: 'Maximum number of players',
        type: 4, // INTEGER
        required: true
      },
    ],
  },
  {
    name: 'status',
    description: 'Check the status of the Minecraft server',
  },
];

export async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    if (process.env.NODE_ENV === 'development') {
      await rest.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.GUILD_ID),
        { body: commands }
      );
      console.log('Successfully reloaded guild-specific commands.');
    } else {
      await rest.put(
        Routes.applicationCommands(config.DISCORD_CLIENT_ID),
        { body: commands }
      );
      console.log('Successfully reloaded global commands.');
    }
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}
