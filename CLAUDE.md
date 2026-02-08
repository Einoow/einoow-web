# Game Portal - Claude Development Guide

## Project Overview

This is a modular web game portal built with React, Vite, and Module Federation. Games are loaded dynamically as federated modules, allowing independent development and deployment.

## Architecture

```
game-portal/
├── packages/
│   ├── shell/          # Main portal application (React + Vite + TailwindCSS)
│   ├── shared/         # Shared types, services, and hooks
│   └── games/
│       ├── game-template/  # Template for new games
│       └── clicker-game/   # Example game
└── .github/workflows/  # CI/CD for Cloudflare Pages
```

## Key Concepts

### Module Federation
- Shell is the **host** application that loads games dynamically
- Each game is a **remote** that exposes a `./Game` module
- Games are loaded at runtime via `remoteEntry.js`
- Shared dependencies (`react`, `react-dom`) are deduplicated

### GameAPI Contract
Every game must export:
- `default`: React component implementing `GameProps`
- `config`: `GameConfig` metadata object

```typescript
interface GameProps {
  lifecycle: GameLifecycleAPI;    // play(), pause(), reset()
  monetization: MonetizationAPI;  // showRewardedAd(), showInterstitial()
  analytics: AnalyticsAPI;        // trackEvent(), trackLevelComplete()
  onExit?: () => void;
  containerWidth: number;
  containerHeight: number;
}
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Run shell + all games in parallel
pnpm dev

# Run only shell
pnpm dev:shell

# Run only clicker game
pnpm dev:clicker

# Build all packages
pnpm build
```

## Ports

| Package | Dev Port | Description |
|---------|----------|-------------|
| shell | 5000 | Main portal |
| clicker-game | 5001 | Clicker game remote |
| game-template | 5002 | Template for new games |

## Creating a New Game

1. Copy `packages/games/game-template` to `packages/games/your-game`
2. Update `package.json`:
   - Change `name` to `@game-portal/your-game`
3. Update `vite.config.ts`:
   - Set `GAME_NAME` to a unique camelCase identifier
   - Set `GAME_PORT` to an unused port
4. Implement your game in `src/Game.tsx`
5. Add entry to `packages/shell/public/games-manifest.json`

## games-manifest.json

The shell loads games from this manifest:

```json
{
  "games": [{
    "id": "your-game",
    "name": "Your Game Name",
    "remoteUrl": "http://localhost:PORT/assets/remoteEntry.js",
    "remoteName": "yourGameName",  // Must match vite.config federation name
    "enabled": true
  }]
}
```

For production, update `remoteUrl` to the deployed URL.

## Code Style

- Use TypeScript for all code
- Follow React best practices (hooks, functional components)
- Use TailwindCSS for styling
- Keep games self-contained (no external state management)
- Track analytics for significant game events

## Monetization Integration

```typescript
// In your game component
const { showAd, isLoading } = useRewardedAd(monetization, {
  onReward: (result) => {
    // Grant reward to player
    setCoins(c => c + result.rewardAmount);
  }
});

// Show ad button
<button onClick={showAd} disabled={isLoading}>
  Watch Ad for Bonus
</button>
```

## Analytics Events to Track

- `game_started` - When game loads
- `game_ended` - When player finishes/exits
- `level_start` / `level_complete` / `level_fail`
- `upgrade_purchased` - In-game purchases
- `rewarded_ad_completed`

## Production Deployment

The project is configured for Cloudflare Pages:
1. Push to `main` branch triggers deployment
2. Shell and games are built and deployed as static sites
3. Update `games-manifest.json` with production URLs

## Troubleshooting

### Game not loading
1. Check if game's dev server is running
2. Verify `remoteUrl` in games-manifest.json
3. Check browser console for Module Federation errors
4. Ensure `remoteName` matches the name in game's vite.config

### Styles not applying
- Ensure TailwindCSS is configured in the game package
- Check that `index.css` is imported in `Game.tsx`

### Shared state issues
- Games should not rely on external state
- Use props passed from shell for all integrations

### Killing processes on Windows
**IMPORTANT**: Never use `Stop-Process -Name node -Force` or similar commands that kill ALL Node.js processes, as this will also terminate Claude Code itself.

Instead, kill processes by their specific PID:
```powershell
# First, find the PID using the port
netstat -ano | findstr ":5001"

# Then kill only that specific process
Stop-Process -Id <PID> -Force
```
