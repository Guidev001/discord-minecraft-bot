import Docker from 'dockerode';
import { prisma } from '../utils/prisma';

const docker = new Docker();

export async function createMinecraftServer(name: string, version: string, maxPlayers: number, ownerGuildId: string) {
  try {

    const container = await docker.createContainer({
      Image: 'itzg/minecraft-server',
      name: `mc-server-${name.toLocaleLowerCase()}`,
      Env: [
        `EULA=TRUE`,
        `VERSION=${version}`,
        `MAX_PLAYERS=${maxPlayers}`,
        `SERVER_NAME=${name}`,
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

    // Pegar o IP do contêiner
    const containerInfo = await container.inspect();
    const ipAddress = containerInfo.NetworkSettings.IPAddress;

    // Salvar informações do servidor no banco de dados usando Prisma
    const newServer = await prisma.server.create({
      data: {
        name,
        ipAddress,
        port: 25565,
        version,
        status: 'ativo',
        ownerGuildId,
        containerId: container.id,
        maxPlayers
      }
    });

    return newServer;
  } catch (error) {
    console.error('Error creating Minecraft server:', error);
    throw new Error('Failed to create Minecraft server.');
  }
}
