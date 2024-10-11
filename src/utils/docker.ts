import Docker from 'dockerode';
import { prisma } from '../utils/prisma';
import { MinecraftServerConfig, MinecraftServerConfigSchema } from '../schemas/minecraft';

const docker = new Docker();

export async function createMinecraftServer(config: MinecraftServerConfig) {

  const validatedConfig = MinecraftServerConfigSchema.parse(config);

  try {
    const container = await docker.createContainer({
      Image: 'itzg/minecraft-server',
      name: `mc-server-${validatedConfig.name.toLocaleLowerCase()}`,
      Env: [
        `EULA=TRUE`,
        `VERSION=${validatedConfig.version}`,
        `MAX_PLAYERS=${validatedConfig.maxPlayers}`,
        `SERVER_NAME=${validatedConfig.name}`,
        `GAME_MODE=${validatedConfig.gameMode}`,
        `DIFFICULTY=${validatedConfig.difficulty}`,
        `HARDCORE=${validatedConfig.hardcore}`,
        `ALLOW_PVP=${validatedConfig.allowPvp}`,
        `ALLOW_NETHER=${validatedConfig.allowNether}`,
        `ONLINE_MODE=${validatedConfig.onlineMode}`, 
        `MOTD=${validatedConfig.motd}`,
      ],
      HostConfig: {
        PortBindings: {
          '25565/tcp': [{ HostPort: '25565' }]
        }
      },
      ExposedPorts: {
        '25565/tcp': {}
      }
    });

    await container.start();

    const containerInfo = await container.inspect();
    const ipAddress = containerInfo.NetworkSettings.IPAddress;

    const newServer = await prisma.server.create({
      data: {
        name: validatedConfig.name,
        version: validatedConfig.version,  
        maxPlayers: validatedConfig.maxPlayers,
        gameMode: validatedConfig.gameMode,
        difficulty: validatedConfig.difficulty,
        hardcore: validatedConfig.hardcore,
        allowPvp: validatedConfig.allowPvp,
        allowNether: validatedConfig.allowNether,
        onlineMode: validatedConfig.onlineMode,
        motd: validatedConfig.motd,
        ipAddress,
        port: 25565,
        status: 'ativo',
        containerId: container.id,
        ownerGuildId: validatedConfig.ownerGuildId,
      }
    });

    return newServer;
  } catch (error) {
    console.error('Error creating Minecraft server:', error);
    throw new Error('Failed to create Minecraft server.');
  }
}
