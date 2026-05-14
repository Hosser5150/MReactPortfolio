import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type Interaction,
  type MessageActionRowComponentBuilder,
  type StringSelectMenuInteraction,
  type TextBasedChannel
} from "discord.js";
import {
  QueryType,
  useMainPlayer,
  useQueue,
  useTimeline,
  type GuildQueue,
  type Player,
  type Track
} from "discord-player";

import { config } from "../config.js";
import type { QueueMetadata } from "../player.js";
import { formatMilliseconds, formatTrack } from "../utils/format.js";
import { replyHidden, replyOrEdit } from "../utils/replies.js";
import { ensurePlayableVoiceChannel, getUserVoiceChannel } from "../utils/voice.js";
import type { BotCommand } from "./types.js";

type EqValues = NonNullable<QueueMetadata["eq"]>;
type EqAction =
  | "bass_down"
  | "bass_up"
  | "mids_down"
  | "mids_up"
  | "treble_down"
  | "treble_up"
  | "volume_down"
  | "volume_up"
  | "reset"
  | "apply";
type EqPresetId = "default" | "pop" | "rap" | "country" | "v_curve";
type SimpleEqualizerBand = {
  band: number;
  gain: number;
};

const DEFAULT_EQ_VALUES: EqValues = {
  bass: 0,
  mids: 0,
  treble: 0,
  volume: config.defaultVolume
};

const EQ_MIN = -10;
const EQ_MAX = 10;
const EQ_STEP = 2;
const VOLUME_MIN = 0;
const VOLUME_MAX = 150;
const VOLUME_STEP = 10;
const EQ_PRESETS: Record<EqPresetId, { label: string; values: Pick<EqValues, "bass" | "mids" | "treble"> }> = {
  default: {
    label: "Default",
    values: { bass: 0, mids: 0, treble: 0 }
  },
  pop: {
    label: "Pop",
    values: { bass: 2, mids: 4, treble: 4 }
  },
  rap: {
    label: "Rap",
    values: { bass: 8, mids: 0, treble: 2 }
  },
  country: {
    label: "Country",
    values: { bass: 2, mids: 6, treble: 4 }
  },
  v_curve: {
    label: "V Curve",
    values: { bass: 6, mids: -4, treble: 6 }
  }
};

function formatQueuedSearchResult(track: Track, playlistTitle?: string, playlistSize?: number): string {
  if (playlistTitle && playlistSize) {
    return `Queued playlist "${playlistTitle}" with ${playlistSize} tracks.`;
  }

  return `Queued: ${formatTrack(track)}`;
}

function clampEqValue(value: number): number {
  return Math.max(EQ_MIN, Math.min(EQ_MAX, value));
}

function clampVolume(value: number): number {
  return Math.max(VOLUME_MIN, Math.min(VOLUME_MAX, value));
}

function getQueueEq(queue: GuildQueue<QueueMetadata>): EqValues {
  return {
    ...DEFAULT_EQ_VALUES,
    ...queue.metadata?.eq
  };
}

function eqValueToGain(value: number): number {
  return value < 0 ? value * 0.025 : value * 0.1;
}

function buildEqBands(values: EqValues): SimpleEqualizerBand[] {
  return Array.from({ length: 15 }, (_, band) => {
    const sourceValue = band <= 3
      ? values.bass
      : band <= 9
        ? values.mids
        : values.treble;

    return {
      band,
      gain: eqValueToGain(sourceValue)
    };
  });
}

function applyEq(queue: GuildQueue<QueueMetadata>, values: EqValues): void {
  const nextValues = {
    bass: clampEqValue(values.bass),
    mids: clampEqValue(values.mids),
    treble: clampEqValue(values.treble),
    volume: clampVolume(values.volume)
  };
  const bands = buildEqBands(nextValues);

  queue.metadata = {
    ...queue.metadata,
    eq: nextValues
  };
  queue.filters._lastFiltersCache.equalizer = bands;
  queue.filters._lastFiltersCache.volume = nextValues.volume;
  queue.filters.equalizer?.setEQ(bands);
  queue.node.setVolume(nextValues.volume);
}

function renderEqBar(value: number): string {
  const filled = (value - EQ_MIN) / EQ_STEP;
  const empty = (EQ_MAX - value) / EQ_STEP;

  return `[${"#".repeat(filled)}${"-".repeat(empty)}] ${value > 0 ? "+" : ""}${value}`;
}

function renderVolumeBar(volume: number): string {
  const filled = Math.round(volume / VOLUME_STEP);
  const empty = VOLUME_MAX / VOLUME_STEP - filled;

  return `[${"#".repeat(filled)}${"-".repeat(empty)}] ${volume}%`;
}

function createEqEmbed(values: EqValues): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle("Session EQ")
    .setDescription(
      [
        `Bass   ${renderEqBar(values.bass)}`,
        `Mids   ${renderEqBar(values.mids)}`,
        `Treble ${renderEqBar(values.treble)}`,
        `Volume ${renderVolumeBar(values.volume)}`,
        "",
        "Changes are applied live and reset when this queue/session ends."
      ].join("\n")
    );
}

function createEqControls(ownerId: string, disabled = false): ActionRowBuilder<MessageActionRowComponentBuilder>[] {
  return [
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`eq:bass_down:${ownerId}`)
        .setLabel("Bass -")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:bass_up:${ownerId}`)
        .setLabel("Bass +")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:mids_down:${ownerId}`)
        .setLabel("Mids -")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:mids_up:${ownerId}`)
        .setLabel("Mids +")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled)
    ),
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`eq:treble_down:${ownerId}`)
        .setLabel("Treble -")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:treble_up:${ownerId}`)
        .setLabel("Treble +")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:volume_down:${ownerId}`)
        .setLabel("Vol -")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:volume_up:${ownerId}`)
        .setLabel("Vol +")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(disabled)
    ),
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`eq:reset:${ownerId}`)
        .setLabel("Reset")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(disabled),
      new ButtonBuilder()
        .setCustomId(`eq:apply:${ownerId}`)
        .setLabel("Apply")
        .setStyle(ButtonStyle.Success)
        .setDisabled(disabled)
    ),
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`eq:preset:${ownerId}`)
        .setPlaceholder("Choose an EQ preset")
        .setDisabled(disabled)
        .addOptions(
          Object.entries(EQ_PRESETS).map(([value, preset]) => ({
            label: preset.label,
            value
          }))
        )
    )
  ];
}

function updateEqValues(values: EqValues, action: EqAction): EqValues {
  switch (action) {
    case "bass_down":
      return { ...values, bass: clampEqValue(values.bass - EQ_STEP) };
    case "bass_up":
      return { ...values, bass: clampEqValue(values.bass + EQ_STEP) };
    case "mids_down":
      return { ...values, mids: clampEqValue(values.mids - EQ_STEP) };
    case "mids_up":
      return { ...values, mids: clampEqValue(values.mids + EQ_STEP) };
    case "treble_down":
      return { ...values, treble: clampEqValue(values.treble - EQ_STEP) };
    case "treble_up":
      return { ...values, treble: clampEqValue(values.treble + EQ_STEP) };
    case "volume_down":
      return { ...values, volume: clampVolume(values.volume - VOLUME_STEP) };
    case "volume_up":
      return { ...values, volume: clampVolume(values.volume + VOLUME_STEP) };
    case "reset":
      return { ...DEFAULT_EQ_VALUES };
    case "apply":
      return values;
  }
}

function applyEqPreset(values: EqValues, presetId: EqPresetId): EqValues {
  return {
    ...values,
    ...EQ_PRESETS[presetId].values
  };
}

async function sendQueueMessage(channel: TextBasedChannel | null | undefined, content: string): Promise<void> {
  if (channel && "send" in channel && typeof channel.send === "function") {
    await channel.send(content);
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timeout: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
      })
    ]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

async function startQueuePlayback(queue: GuildQueue<QueueMetadata>): Promise<void> {
  if (queue.isPlaying() || queue.node.isBuffering()) {
    return;
  }

  const nextTrack = queue.tracks.toArray()[0];
  queue.metadata.startingTrack = nextTrack?.title ?? null;

  try {
    await withTimeout(
      queue.node.play(null),
      config.voiceConnectionTimeoutMs + 30_000,
      "Timed out while starting the audio stream."
    );
  } catch (error) {
    console.error("Failed to start queue playback:", error);
    await sendQueueMessage(
      queue.metadata?.channel,
      "I could queue that track, but the audio stream did not start. This is usually the YouTube extractor failing to produce a playable stream."
    );
    queue.delete();
  }
}

const playCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("pick a song bro")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("A URL or search phrase.")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const voiceChannel = await ensurePlayableVoiceChannel(interaction);

    if (!voiceChannel) {
      return;
    }

    await interaction.deferReply();

    const player = useMainPlayer();
    const query = interaction.options.getString("query", true);
    const result = await player.search(query, {
      requestedBy: interaction.user as unknown as NonNullable<Parameters<Player["search"]>[1]>["requestedBy"],
      fallbackSearchEngine: QueryType.YOUTUBE_SEARCH
    });

    if (result.isEmpty()) {
      await replyOrEdit(interaction, `No results found for "${query}".`);
      return;
    }

    if (!interaction.guild) {
      await replyOrEdit(interaction, "Use this command inside a server.");
      return;
    }

    const queue = player.nodes.create<QueueMetadata>(
      interaction.guild as unknown as Parameters<Player["nodes"]["create"]>[0],
      {
        metadata: {
          channel: interaction.channel as TextBasedChannel | null,
          requestedBy: interaction.user.id,
          startingTrack: null
        },
        volume: config.defaultVolume,
        connectionTimeout: config.voiceConnectionTimeoutMs,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: config.leaveOnEmptyCooldownMs,
        leaveOnEnd: false,
        selfDeaf: true
      }
    );

    queue.metadata = {
      channel: interaction.channel as TextBasedChannel | null,
      requestedBy: interaction.user.id,
      startingTrack: queue.metadata?.startingTrack ?? null,
      eq: queue.metadata?.eq
    };

    if (!queue.channel) {
      await withTimeout(
        queue.connect(voiceChannel as unknown as Parameters<typeof queue.connect>[0], {
          deaf: true,
          timeout: config.voiceConnectionTimeoutMs
        }),
        config.voiceConnectionTimeoutMs + 5_000,
        "Timed out while connecting to the voice channel."
      );
    }

    const firstTrack = result.tracks[0];

    if (!firstTrack) {
      await replyOrEdit(interaction, `No playable tracks found for "${query}".`);
      return;
    }

    if (result.playlist) {
      queue.addTrack(result.playlist);
    } else {
      queue.addTrack(firstTrack);
    }

    const queued = formatQueuedSearchResult(
      firstTrack,
      result.playlist?.title,
      result.playlist?.tracks.length
    );

    await replyOrEdit(interaction, queued);
    void startQueuePlayback(queue);
  }
};

const queueCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current queue."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

    if (!queue) {
      await replyHidden(interaction, "This server does not have an active queue.");
      return;
    }

    const currentTrack = queue.currentTrack;
    const startingTrack = queue.metadata?.startingTrack;
    const upcomingTracks = queue.tracks.toArray().slice(0, 10);
    const upcoming = upcomingTracks.length
      ? upcomingTracks.map((track, index) => `${index + 1}. ${formatTrack(track)}`).join("\n")
      : "No upcoming tracks.";

    await interaction.reply(
      [
        currentTrack
          ? `Now playing: ${formatTrack(currentTrack)}`
          : startingTrack
            ? `Starting: ${startingTrack}`
            : "Nothing is playing right now.",
        "",
        "Up next:",
        upcoming
      ].join("\n")
    );
  }
};

const clearCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear the upcoming queue while leaving the current song."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

    if (!queue) {
      await replyHidden(interaction, "There is no queue to clear.");
      return;
    }

    const clearedTracks = queue.tracks.size;
    queue.clear();

    await interaction.reply(`Cleared ${clearedTracks} upcoming track${clearedTracks === 1 ? "" : "s"}.`);
  }
};

const skipCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

    if (!queue || !queue.isPlaying()) {
      await replyHidden(interaction, "There is no song playing right now.");
      return;
    }

    queue.node.skip();
    await interaction.reply("Skipped the current song.");
  }
};

const rewindCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("rewind")
    .setDescription("Rewind the current song.")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("How many seconds to rewind. Defaults to 10.")
        .setMinValue(1)
        .setMaxValue(600)
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

    if (!queue || !queue.isPlaying()) {
      await replyHidden(interaction, "There is no song playing right now.");
      return;
    }

    const rewindSeconds = interaction.options.getInteger("seconds") ?? 10;
    const timestamp = queue.node.getTimestamp();
    const currentMs = timestamp?.current.value ?? 0;
    const targetMs = Math.max(0, currentMs - rewindSeconds * 1000);
    const didSeek = await queue.node.seek(targetMs);

    if (!didSeek) {
      await replyHidden(interaction, "I could not rewind this track.");
      return;
    }

    await interaction.reply(`Rewound to ${formatMilliseconds(targetMs)}.`);
  }
};

const pauseCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Toggle pause and resume for the current song."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const timeline = useTimeline();

    if (!timeline) {
      await replyHidden(interaction, "This server does not have an active player session.");
      return;
    }

    const wasPaused = timeline.paused;
    wasPaused ? timeline.resume() : timeline.pause();

    await interaction.reply(wasPaused ? "Resumed playback." : "Paused playback.");
  }
};

const nowPlayingCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show the current song."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;
    const currentTrack = queue?.currentTrack;

    if (!currentTrack) {
      await replyHidden(interaction, "No song is currently playing.");
      return;
    }

    const progress = queue.node.createProgressBar();

    await interaction.reply(
      [
        `Now playing: ${formatTrack(currentTrack)}`,
        progress ? `Progress: ${progress}` : undefined
      ]
        .filter(Boolean)
        .join("\n")
    );
  }
};

const eqCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("eq")
    .setDescription("Open a live session EQ for bass, mids, and treble."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

    if (!queue) {
      await replyHidden(interaction, "Start playback first, then use `/eq` while the bot has an active queue.");
      return;
    }

    const values = getQueueEq(queue);
    applyEq(queue, values);

    await interaction.reply({
      embeds: [createEqEmbed(values)],
      components: createEqControls(interaction.user.id),
      ephemeral: true
    });
  }
};

const niceCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("nigga")
    .setDescription("speed my mom is kinda homeless."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply("kys nigga.");
  }
};

const joinCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join channel."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const voiceChannel = await getUserVoiceChannel(interaction);

    if (!voiceChannel || !interaction.inCachedGuild()) {
      return;
    }

    const player = useMainPlayer();

    await player.voiceUtils.join(voiceChannel as unknown as Parameters<typeof player.voiceUtils.join>[0], {
      deaf: true
    });

    await interaction.reply(`Joined ${voiceChannel.name}.`);
  }
};

const leaveCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave the vc and delete queue."),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.guildId) {
      await replyHidden(interaction, "Use this command inside a server.");
      return;
    }

    const player = useMainPlayer();
    const queue = useQueue<QueueMetadata>(interaction.guildId);
    const connection = player.voiceUtils.getConnection(interaction.guildId);

    queue?.delete();
    player.nodes.delete(interaction.guildId);

    if (connection) {
      player.voiceUtils.disconnect(connection);
    }

    if (interaction.inCachedGuild()) {
      const me = interaction.guild.members.me ?? (await interaction.guild.members.fetchMe());

      if (me.voice.channel) {
        await me.voice.disconnect("Leave command requested.");
      }
    }

    await interaction.reply("Left the voice channel and cleared the active queue.");
  }
};

export const commands: BotCommand[] = [
  playCommand,
  queueCommand,
  clearCommand,
  skipCommand,
  rewindCommand,
  pauseCommand,
  nowPlayingCommand,
  eqCommand,
  niceCommand,
  joinCommand,
  leaveCommand
];

export async function handleMusicComponent(interaction: Interaction): Promise<boolean> {
  if (!("customId" in interaction) || !interaction.customId.startsWith("eq:")) {
    return false;
  }

  if (interaction.isButton()) {
    await handleEqButton(interaction);
    return true;
  }

  if (interaction.isStringSelectMenu()) {
    await handleEqPreset(interaction);
    return true;
  }

  return true;
}

async function handleEqButton(interaction: ButtonInteraction): Promise<void> {
  const [, rawAction, ownerId] = interaction.customId.split(":");
  const action = rawAction as EqAction | undefined;

  if (!action || !ownerId) {
    await interaction.reply({ content: "This EQ control is malformed.", ephemeral: true });
    return;
  }

  if (interaction.user.id !== ownerId) {
    await interaction.reply({ content: "Only the person who opened this EQ panel can adjust it.", ephemeral: true });
    return;
  }

  const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

  if (!queue) {
    await interaction.update({
      content: "This EQ session ended because there is no active queue.",
      embeds: [],
      components: []
    });
    return;
  }

  const nextValues = updateEqValues(getQueueEq(queue), action);
  applyEq(queue, nextValues);

  if (action === "apply") {
    await interaction.update({
      content: "EQ applied for this session.",
      embeds: [createEqEmbed(nextValues)],
      components: []
    });
    return;
  }

  await interaction.update({
    embeds: [createEqEmbed(nextValues)],
    components: createEqControls(ownerId)
  });
}

async function handleEqPreset(interaction: StringSelectMenuInteraction): Promise<void> {
  const [, action, ownerId] = interaction.customId.split(":");

  if (action !== "preset" || !ownerId) {
    await interaction.reply({ content: "This EQ preset control is malformed.", ephemeral: true });
    return;
  }

  if (interaction.user.id !== ownerId) {
    await interaction.reply({ content: "Only the person who opened this EQ panel can adjust it.", ephemeral: true });
    return;
  }

  const presetId = interaction.values[0] as EqPresetId | undefined;

  if (!presetId || !(presetId in EQ_PRESETS)) {
    await interaction.reply({ content: "That EQ preset is not available.", ephemeral: true });
    return;
  }

  const queue = interaction.guildId ? useQueue<QueueMetadata>(interaction.guildId) : null;

  if (!queue) {
    await interaction.update({
      content: "This EQ session ended because there is no active queue.",
      embeds: [],
      components: []
    });
    return;
  }

  const nextValues = applyEqPreset(getQueueEq(queue), presetId);
  applyEq(queue, nextValues);

  await interaction.update({
    embeds: [createEqEmbed(nextValues)],
    components: createEqControls(ownerId)
  });
}
