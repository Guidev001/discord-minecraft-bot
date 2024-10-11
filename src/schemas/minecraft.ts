import { z } from 'zod';

const GameModeEnum = z.enum(['survival', 'creative', 'adventure', 'spectator']);
const DifficultyEnum = z.enum(['peaceful', 'easy', 'normal', 'hard']);
const StatusEnum = z.enum(['ativo', 'inativo', 'parado']);

export const MinecraftServerConfigSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  maxPlayers: z.number().int().min(1),
  ownerGuildId: z.string().min(1),
  gameMode: GameModeEnum.optional().default("survival"),
  difficulty: DifficultyEnum.optional().default("normal"),
  hardcore: z.boolean().optional().default(false),
  allowPvp: z.boolean().optional().default(true),
  allowNether: z.boolean().optional().default(true),
  onlineMode: z.boolean().optional().default(true),
  motd: z.string().optional().default("Servidor gerado pelo Bot do Discord"),
  status: StatusEnum.optional().default("ativo")
});

export type MinecraftServerConfig = z.infer<typeof MinecraftServerConfigSchema>;
