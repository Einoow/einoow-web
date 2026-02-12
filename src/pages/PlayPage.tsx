import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import type { Game } from '../types';
import gamesData from '../data/games.json';

const games: Game[] = gamesData as Game[];

export function PlayPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [embedMode, setEmbedMode] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Find game for SEO (memoized to avoid re-renders)
  const foundGame = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  // SEO for game page
  useSEO({
    title: foundGame ? `Play ${foundGame.name}` : 'Game Not Found',
    description: foundGame 
      ? `Play ${foundGame.name} - ${foundGame.description}`
      : 'The game you are looking for does not exist.',
    canonicalPath: `/play/${gameId}`,
    ogImage: foundGame?.image ? `https://einoow.com${foundGame.image}` : undefined,
  });

  useEffect(() => {
    if (foundGame) {
      setGame(foundGame);
      // Auto-redirect for live games
      if ((foundGame.status === 'live' || foundGame.status === 'in-development') && !embedMode) {
        setRedirecting(true);
        const timer = setTimeout(() => {
          window.location.href = foundGame.url;
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [foundGame, embedMode]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🎮</span>
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Game Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The game you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            ← Back to Games
          </Link>
        </div>
      </div>
    );
  }

  // Redirecting state
  if (redirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero image */}
        <div className="w-full max-w-2xl mb-8 rounded-xl overflow-hidden shadow-2xl shadow-primary-500/10">
          <img 
            src={`/${game.id}_hero.png`}
            alt={game.name}
            className="w-full h-auto"
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Launching {game.name}
          </h1>
          <p className="text-gray-400 mb-6">
            Redirecting you to {game.url}...
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={game.url}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Go Now →
            </a>
            <button
              onClick={() => {
                setRedirecting(false);
                setEmbedMode(true);
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
            >
              Play Embedded
            </button>
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Embed mode
  if (embedMode) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Toolbar */}
        <div className="bg-dark-200 border-b border-white/5 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back
            </Link>
            <span className="text-white font-medium">{game.name}</span>
          </div>
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 transition-colors text-sm flex items-center gap-1"
          >
            Open in new tab
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        {/* Iframe */}
        <div className="flex-1">
          <iframe
            src={game.url}
            title={game.name}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay"
          />
        </div>
      </div>
    );
  }

  // Coming soon state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero image */}
      <div className="w-full max-w-2xl mb-8 rounded-xl overflow-hidden shadow-2xl shadow-primary-500/10">
        <img 
          src={`/${game.id}_hero.png`}
          alt={game.name}
          className="w-full h-auto"
          onError={(e) => {
            (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
          }}
        />
      </div>
      <div className="text-center max-w-md">
        <span className="text-6xl mb-4 block">🚧</span>
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          {game.name}
        </h1>
        <p className="text-gray-400 mb-2">{game.description}</p>
        <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm mb-6">
          {game.status === 'beta' ? 'In Beta' : 'Coming Soon'}
        </span>
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
          >
            ← Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}
