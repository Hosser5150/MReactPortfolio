import { DefaultExtractors } from "@discord-player/extractor";
import { GuildQueueEvent, Player } from "discord-player";
import { YoutubeExtractor } from "discord-player-youtubei";
import { AttachmentBuilder, type Client, type TextBasedChannel } from "discord.js";
import ffmpegStatic from "ffmpeg-static";
import { existsSync } from "node:fs";
import path from "node:path";

import { config } from "./config.js";

const ffmpegPath = typeof ffmpegStatic === "string" ? ffmpegStatic : null;
const queueFinishedGifPath = path.join(process.cwd(), "assets", "queue-finished.gif");

if (ffmpegPath) {
  process.env.FFMPEG_PATH ??= ffmpegPath;
}

export interface QueueMetadata {
  channel?: TextBasedChannel | null;
  requestedBy?: string;
  startingTrack?: string | null;
  eq?: {
    bass: number;
    mids: number;
    treble: number;
    volume: number;
  };
}

export async function createMusicPlayer(client: Client): Promise<Player> {
  const player = new Player(client as unknown as ConstructorParameters<typeof Player>[0], {
    connectionTimeout: config.voiceConnectionTimeoutMs,
    ffmpegPath: ffmpegPath ?? undefined
  });

  await player.extractors.loadMulti(DefaultExtractors);
  await player.extractors.register(YoutubeExtractor, {});

  player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
    queue.metadata.startingTrack = null;
    console.log(`[player] started: ${track.title}`);
    await queue.metadata?.channel?.send(`Now playing: ${track.title}`);
  });

  player.events.on(GuildQueueEvent.PlayerFinish, (_queue, track) => {
    console.log(`[player] finished: ${track.title}`);
  });

  player.events.on(GuildQueueEvent.PlayerSkip, (_queue, track, reason, description) => {
    console.warn(`[player] skipped: ${track.title} (${reason}) ${description}`);
  });

  player.events.on(GuildQueueEvent.Debug, (_queue, message) => {
    if (config.musicDebug) {
      console.log(`[queue-debug] ${message}`);
    }
  });

  player.events.on(GuildQueueEvent.WillPlayTrack, (_queue, track, _config, done) => {
    console.log(`[player] preparing next track: ${track.title}`);
    done();
  });

  player.events.on(GuildQueueEvent.AudioTrackAdd, async (queue, track) => {
    console.log(`[player] queued: ${track.title}`);
  });

  player.events.on(GuildQueueEvent.AudioTracksAdd, async (queue, tracks) => {
    console.log(`[player] queued ${tracks.length} tracks.`);
  });

  player.events.on(GuildQueueEvent.EmptyChannel, async (queue) => {
    await queue.metadata?.channel?.send("Voice channel emptied, leaving the call.");
  });

  player.events.on(GuildQueueEvent.EmptyQueue, async (queue) => {
    if (existsSync(queueFinishedGifPath)) {
      await queue.metadata?.channel?.send({
        content: "Queue finished.",
        files: [new AttachmentBuilder(queueFinishedGifPath, { name: "queue-finished.gif" })]
      });
      return;
    }

    await queue.metadata?.channel?.send("Queue finished.");
  });

  player.events.on(GuildQueueEvent.Error, async (queue, error) => {
    console.error("Discord Player queue error:", error);
    const isAbortError = error.name === "AbortError" || "code" in error && error.code === "ABORT_ERR";
    const message = isAbortError
      ? "Discord voice did not become ready before the timeout. I left the voice channel; try `/play` again, and check Discord voice region/network if it repeats."
      : "Playback hit an error. Check the bot logs for details.";

    if (isAbortError) {
      queue.delete();
    }

    await queue.metadata?.channel?.send(message);
  });

  player.events.on(GuildQueueEvent.PlayerError, async (queue, error, track) => {
    console.error(`Discord Player stream error for ${track.title}:`, error);
    await queue.metadata?.channel?.send(`Could not stream "${track.title}". Skipping to the next track.`);
  });

  player.on("error", (error) => {
    console.error("Discord Player error:", error);
  });

  player.on("debug", (message) => {
    if (config.musicDebug) {
      console.log(`[player-debug] ${message}`);
    }
  });

  return player;
}
