import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder
} from "discord.js";

export type CommandData = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

export interface BotCommand {
  data: CommandData;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
