import {
  GuildMember,
  PermissionsBitField,
  type ChatInputCommandInteraction,
  type VoiceBasedChannel
} from "discord.js";

import { replyHidden } from "./replies.js";

export async function getUserVoiceChannel(
  interaction: ChatInputCommandInteraction
): Promise<VoiceBasedChannel | null> {
  if (!interaction.inCachedGuild()) {
    await replyHidden(interaction, "Use this command inside a server.");
    return null;
  }

  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    await replyHidden(interaction, "Join a voice channel first.");
    return null;
  }

  return voiceChannel;
}

export async function ensurePlayableVoiceChannel(
  interaction: ChatInputCommandInteraction
): Promise<VoiceBasedChannel | null> {
  const voiceChannel = await getUserVoiceChannel(interaction);

  if (!voiceChannel || !interaction.inCachedGuild()) {
    return null;
  }

  const me = interaction.guild.members.me ?? (await interaction.guild.members.fetchMe());
  const currentVoiceChannel = me.voice.channel;

  if (currentVoiceChannel && currentVoiceChannel.id !== voiceChannel.id) {
    await replyHidden(
      interaction,
      `I am already connected to ${currentVoiceChannel.name}. Use /leave first if this is a debug session.`
    );
    return null;
  }

  const permissions = voiceChannel.permissionsFor(me);

  if (!permissions?.has(PermissionsBitField.Flags.Connect)) {
    await replyHidden(interaction, "I do not have permission to join that voice channel.");
    return null;
  }

  if (!permissions.has(PermissionsBitField.Flags.Speak)) {
    await replyHidden(interaction, "I do not have permission to speak in that voice channel.");
    return null;
  }

  return voiceChannel;
}
