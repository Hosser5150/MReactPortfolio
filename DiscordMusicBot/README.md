# Discord Music Bot

TypeScript scaffold for a Discord music bot that can be run on demand during development or kept alive 24/7 with PM2.

## Features

- Slash commands for `/play`, `/queue`, `/clear`, `/skip`, `/rewind`, `/pause`, `/nowplaying`, `/join`, and `/leave`.
- YouTube and YouTube Music support through `discord-player-youtubei`.
- Spotify URL/search support through Discord Player's extractor bridge.
- YouTube playlist and Spotify playlist queuing through the extractor layer.
- Local in-call playlist behavior by repeatedly using `/play`; those tracks become the server queue.
- Debug voice commands to force the bot to join or leave your current call.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in:

   ```bash
   DISCORD_TOKEN=...
   DISCORD_CLIENT_ID=...
   DISCORD_GUILD_ID=...
   ```

3. Deploy slash commands to your test server:

   ```bash
   npm run commands:deploy
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

## 24/7 Mode

When you want it online all the time:

```bash
npm run pm2:start
```

When you want it offline:

```bash
npm run pm2:stop
```

PM2 keeps the built bot running and restarts it if the process crashes. The bot is offline whenever that process is stopped.

## Command Notes

- `/play query:<url or search>` joins your voice channel and queues a track or playlist.
- `/queue` shows the current track and next 10 queued items.
- `/clear` clears upcoming tracks but leaves the current track playing.
- `/skip` skips the current track.
- `/rewind seconds:<number>` rewinds the current track, defaulting to 10 seconds.
- `/pause` toggles pause/resume.
- `/join` and `/leave` are useful for voice connection debugging.

## Source Caveats

Discord Player v7 removed its official YouTube extractor because YouTube extraction breaks often. This scaffold uses `discord-player-youtubei` so YouTube and YouTube Music can work, but expect that dependency to need updates over time. Spotify playback is metadata/search bridging rather than direct Spotify audio streaming.
