import { Rcon } from 'rcon-client';
import config from '../config';

export async function sendRconCommand(command: string): Promise<string> {
  const rcon = await Rcon.connect({
    host: config.MINECRAFT_RCON_HOST,
    port: parseInt(config.MINECRAFT_RCON_PORT),
    password: config.MINECRAFT_RCON_PASSWORD
  });

  try {
    const response = await rcon.send(command);
    await rcon.end();
    return response;
  } catch (error) {
    await rcon.end();
    throw new Error('Failed to send RCON command');
  }
}
