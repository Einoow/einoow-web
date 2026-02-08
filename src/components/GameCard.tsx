import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const statusColors = {
    live: 'bg-green-500',
    beta: 'bg-yellow-500',
    'coming-soon': 'bg-gray-500',
  };

  const statusLabels = {
    live: 'Live',
    beta: 'Beta',
    'coming-soon': 'Coming Soon',
  };

  return (
    <button
      onClick={() => onClick(game)}
      className="group relative bg-dark-200 rounded-xl overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10 text-left w-full"
    >
      {/* Image */}
      <div className="aspect-video bg-dark-100 relative overflow-hidden">
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusColors[game.status]}`}
          >
            {statusLabels[game.status]}
          </span>
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-primary-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Play
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-white group-hover:text-primary-400 transition-colors">
          {game.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{game.description}</p>
        
        {/* Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-dark-100 rounded text-xs text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
