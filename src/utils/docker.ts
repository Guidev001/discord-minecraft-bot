import Docker from "dockerode";
import { prisma } from "../utils/prisma";
import {
  MinecraftServerConfig,
  MinecraftServerConfigSchema,
} from "../schemas/minecraft";

const docker = new Docker();

export async function getAvailablePort() {
  const servers = await prisma.server.findMany({
    select: { port: true },
  });

  const usedPorts = servers.map((server) => server.port);

  let port = 25565;
  while (usedPorts.includes(port)) {
    port += 1;
  }

  return port;
}

export async function createMinecraftServer(config: MinecraftServerConfig) {
  const validatedConfig = MinecraftServerConfigSchema.parse(config);

  try {
    const availablePort = await getAvailablePort();
    const container = await docker.createContainer({
      Image: `itzg/minecraft-server`,
      name: `mc-server-${validatedConfig.name
        .toLocaleLowerCase()
        .replace(/ /g, "-")
        .trim()}`,
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
        'MEMORY: 4G'
      ],
      HostConfig: {
        PortBindings: {
          "25565/tcp": [{ HostPort: availablePort.toString() }],
        },
      },
      ExposedPorts: {
        "25565/tcp": {},
      },
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
        port: availablePort,
        status: "active",
        containerId: container.id,
        ownerGuildId: validatedConfig.ownerGuildId,
      },
    });

    return newServer;
  } catch (error) {
    console.error("Error creating Minecraft server:", error);
    throw new Error("Failed to create Minecraft server.");
  }
}
