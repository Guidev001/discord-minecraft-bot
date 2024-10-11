import { CommandInteraction, ApplicationCommandOptionType, CommandInteractionOptionResolver } from 'discord.js';
import { fetchMinecraftVersions } from '../../utils/minecraftApi';
import { createMinecraftServer } from '../../utils/docker';

interface Version {
  id: string;
}

// Carrega as versões disponíveis antes de registrar o comando
let versionOptions: { name: string; value: string }[] = [];

fetchMinecraftVersions().then(versions => {
  versionOptions = versions.map((version: Version) => ({
    name: version.id,
    value: version.id
  }));
});

export async function createCommand(interaction: CommandInteraction) {
  // Garantir que as opções de nome, versão e maxPlayers são válidas
  const name = (interaction.options as CommandInteractionOptionResolver).getString('name') || "DefaultServerName";
  const version = (interaction.options as CommandInteractionOptionResolver).getString('version') || "1.20.1";
  const maxPlayers = (interaction.options as CommandInteractionOptionResolver).getInteger('max_players') || 20;

  // Criação do servidor
  try {
    const newServer = await createMinecraftServer(name, version, maxPlayers, interaction.guildId!);
    await interaction.reply(`Server ${newServer.name} created successfully!`);
  } catch (error) {
    console.error('Error creating server:', error);
    await interaction.reply('Failed to create server. Please try again later.');
  }
}

// Definição do comando para registrar:
export const createCommandData = {
  name: 'create',
  description: 'Create a new Minecraft server',
  options: [
    {
      name: 'name',
      type: ApplicationCommandOptionType.String,
      description: 'Name of the Minecraft server',
      required: true
    },
    {
      name: 'version',
      type: ApplicationCommandOptionType.String,
      description: 'Version of Minecraft',
      required: true,
      choices: versionOptions  // Preenche as opções com as versões disponíveis
    },
    {
      name: 'max_players',
      type: ApplicationCommandOptionType.Integer,
      description: 'Max number of players',
      required: true
    }
  ]
};
