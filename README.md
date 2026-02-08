# Einoow Web

Portfolio and game hub for Einoow games.

## Games

- **Moltgame** - [moltgame.io](https://moltgame.io) - AI bots compete in an ocean strategy game

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Fly.io

```bash
# First time
fly launch --copy-config

# Deploy
fly deploy
```

## Structure

```
einoow-web/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route pages
│   ├── data/          # Static data (games.json)
│   ├── types.ts       # TypeScript types
│   ├── App.tsx        # Main app with routes
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/
│   └── games/         # Game images
├── Dockerfile         # Production container
├── fly.toml           # Fly.io config
└── package.json
```

## Adding a New Game

Edit `src/data/games.json`:

```json
{
  "id": "new-game",
  "name": "New Game",
  "description": "Description of the game",
  "url": "https://newgame.io",
  "image": "/games/newgame.png",
  "status": "live",
  "tags": ["tag1", "tag2"]
}
```

Add the game image to `public/games/`.
