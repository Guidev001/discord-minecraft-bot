# Discord Minecraft Bot

Este é um bot para Discord que permite gerenciar servidores Minecraft diretamente a partir do Discord. Ele utiliza Docker para criar e gerenciar os servidores Minecraft e se conecta ao servidor Minecraft usando RCON para comunicação.

## Funcionalidades
- Criação de servidores Minecraft personalizados através de comandos do Discord.
- Suporte para configuração de várias opções, como versão do Minecraft, número máximo de jogadores, modo de jogo, dificuldade e mais.
- Integração com Docker para gerenciamento de servidores Minecraft.
- Suporte ao Prisma para interação com o banco de dados.

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/discord-minecraft-bot.git
   cd discord-minecraft-bot
   ```

2. Instale as dependências:
   ```bash
    npm install
   ```

3. Configure o arquivo .env com suas credenciais: Renomeie o arquivo .env.template para .env:
   ```bash
    mv .env.template .env
   ```

   Atualize o arquivo .env com as seguintes variáveis:
   ```bash
   NODE_ENV="development"
   DISCORD_TOKEN="Seu Token do Discord"
   DISCORD_CLIENT_ID="Seu Client ID do Discord"
   GUILD_ID="ID da Guild"
   DATABASE_URL="URL do seu banco de dados MongoDB"
   ```

4. Compile o projeto:
   ```bash
   npm run build
   ```

5. Inicie o bot:
   ```bash
   npm start
   ```

Para rodar em modo de desenvolvimento, use:
```bash
npm run dev
```
