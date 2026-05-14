import type { Track } from "discord-player";

export function formatTrack(track: Track<unknown>): string {
  const title = track.title || "Unknown title";
  const author = track.author ? ` by ${track.author}` : "";
  const duration = track.duration ? ` (${track.duration})` : "";

  return `${title}${author}${duration}`;
}

export function formatMilliseconds(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
