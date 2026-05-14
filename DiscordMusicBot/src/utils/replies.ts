import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";

export async function replyHidden(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<void> {
  if (interaction.deferred || interaction.replied) {
    await interaction.followUp({ content, flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.reply({ content, flags: MessageFlags.Ephemeral });
}

export async function replyOrEdit(
  interaction: ChatInputCommandInteraction,
  content: string
): Promise<void> {
  if (interaction.deferred) {
    await interaction.editReply(content);
    return;
  }

  if (interaction.replied) {
    await interaction.followUp(content);
    return;
  }

  await interaction.reply(content);
}
