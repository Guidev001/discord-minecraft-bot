import { CommandInteraction } from 'discord.js';
import { createMinecraftServer } from '../../../../utils/docker'; // Função de criação do servidor
import { fetchMinecraftVersions } from '../../../../utils/minecraftApi';
import { MinecraftServerConfigSchema, MinecraftServerConfig } from '../../../../schemas/minecraft'; // Importando o schema do Zod
import { z } from 'zod';

export async function createCommand(interaction: CommandInteraction) {
  const serverName = interaction.options.get('name')?.value as string;
  const version = interaction.options.get('version')?.value as string;
  const maxPlayers = interaction.options.get('maxplayers')?.value as number;

  // Verificar se o ownerGuildId não é nulo
  if (!interaction.guildId) {
    await interaction.reply('Erro: Não foi possível identificar a guilda.');
    return;
  }

  if (!serverName || !version || !maxPlayers) {
    await interaction.reply('Por favor, preencha todas as informações necessárias: nome, versão, e número máximo de jogadores.');
    return;
  }

  try {
    const availableVersions = await fetchMinecraftVersions();
    const versionExists = availableVersions.some((v: any) => v.id === version);

    if (!versionExists) {
      await interaction.reply('Versão do Minecraft inválida. Por favor, verifique as versões disponíveis.');
      return;
    }

    // Criação do objeto de configuração usando validação com Zod
    const serverConfigData = {
      name: serverName,
      version: version,
      maxPlayers: maxPlayers,
      ownerGuildId: interaction.guildId, // Guilda onde o comando foi executado
    };

    // Fazemos a validação usando o Zod
    const validatedConfig: MinecraftServerConfig = MinecraftServerConfigSchema.parse(serverConfigData);

    // Chama a função para criar o servidor com a configuração validada
    const newServer = await createMinecraftServer(validatedConfig);

    await interaction.reply(`Servidor Minecraft '${newServer.name}' foi criado com sucesso! IP: ${newServer.ipAddress}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      await interaction.reply(`Erro na configuração do servidor: ${error}`);
    } else {
      console.error('Erro ao criar o servidor:', error);
      await interaction.reply('Ocorreu um erro ao tentar criar o servidor de Minecraft.');
    }
  }
}
