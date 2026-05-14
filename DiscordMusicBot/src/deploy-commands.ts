import { REST, Routes } from "discord.js";

import { commands } from "./commands/index.js";
import { config } from "./config.js";

const rest = new REST({ version: "10" }).setToken(config.token);
const commandPayload = commands.map((command) => command.data.toJSON());

if (config.deployGlobalCommands) {
  console.log(`Deploying ${commandPayload.length} global command(s).`);
  await rest.put(Routes.applicationCommands(config.clientId), {
    body: commandPayload
  });
  console.log("Global commands deployed. Discord can take up to an hour to show global updates.");
} else {
  if (!config.guildId) {
    throw new Error(
      "DISCORD_GUILD_ID is required for guild command deployment. Set DEPLOY_GLOBAL_COMMANDS=true to deploy globally."
    );
  }

  console.log(`Deploying ${commandPayload.length} command(s) to guild ${config.guildId}.`);
  await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: commandPayload
  });
  console.log("Guild commands deployed.");
}
