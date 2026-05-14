import { Collection, Events, GatewayIntentBits, type ChatInputCommandInteraction } from "discord.js";
import { Client } from "discord.js";

import { commands, handleMusicComponent, type BotCommand } from "./commands/index.js";
import { config } from "./config.js";
import { createMusicPlayer } from "./player.js";
import { replyHidden } from "./utils/replies.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const commandMap = new Collection<string, BotCommand>();

for (const command of commands) {
  commandMap.set(command.data.name, command);
}

const player = await createMusicPlayer(client);

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  console.log(`Loaded ${commandMap.size} command(s).`);
  console.log(player.scanDeps());
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (await handleMusicComponent(interaction)) {
    return;
  }

  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (!interaction.inCachedGuild()) {
    await replyHidden(interaction, "Use this bot inside a server.");
    return;
  }

  const command = commandMap.get(interaction.commandName);

  if (!command) {
    await replyHidden(interaction, "That command is not registered in this bot process.");
    return;
  }

  try {
    await player.context.provide(
      { guild: interaction.guild } as unknown as Parameters<typeof player.context.provide>[0],
      () => command.execute(interaction as ChatInputCommandInteraction)
    );
  } catch (error) {
    console.error(`Command ${interaction.commandName} failed:`, error);
    await replyHidden(interaction, "Something went wrong while running that command.");
  }
});

await client.login(config.token);
