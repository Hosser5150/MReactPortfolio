import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function numberEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be a number. Received: ${rawValue}`);
  }

  return parsed;
}

export const config = {
  token: requireEnv("DISCORD_TOKEN"),
  clientId: requireEnv("DISCORD_CLIENT_ID"),
  guildId: process.env.DISCORD_GUILD_ID,
  deployGlobalCommands: process.env.DEPLOY_GLOBAL_COMMANDS === "true",
  defaultVolume: numberEnv("DEFAULT_VOLUME", 70),
  leaveOnEmptyCooldownMs: numberEnv("LEAVE_ON_EMPTY_COOLDOWN_MS", 300_000),
  voiceConnectionTimeoutMs: numberEnv("VOICE_CONNECTION_TIMEOUT_MS", 120_000),
  musicDebug: process.env.MUSIC_DEBUG === "true"
};
