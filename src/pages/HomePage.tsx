import { useNavigate } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { useSEO } from '../hooks/useSEO';
import type { Game } from '../types';
import gamesData from '../data/games.json';

const games: Game[] = gamesData as Game[];

export function HomePage() {
  const navigate = useNavigate();
  
  useSEO({
    canonicalPath: '/',
  });
  
  const featuredGame = games.find((g) => g.featured);
  const otherGames = games.filter((g) => !g.featured);

  const handleGameClick = (game: Game) => {
    navigate(`/play/${game.id}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredGame && (
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-300 to-dark-300" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in-up">
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4">
                  ✨ Featured Game
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                  {featuredGame.name}
                </h1>
                <p className="text-gray-400 text-lg mb-6 max-w-md">
                  {featuredGame.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleGameClick(featuredGame)}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play Now
                  </button>
                </div>
              </div>
              
              <div className="animate-fade-in">
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {featuredGame.image ? (
                      <img
                        src={featuredGame.image}
                        alt={featuredGame.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-200 flex items-center justify-center">
                        <span className="text-6xl">🎮</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Games */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            {featuredGame ? 'More Games' : 'All Games'}
          </h2>
          
          {games.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🎮</span>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                No games yet
              </h3>
              <p className="text-gray-400">
                Check back soon for new games!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredGame ? otherGames : games).map((game) => (
                <GameCard key={game.id} game={game} onClick={handleGameClick} />
              ))}
              
              {/* Coming soon placeholder */}
              <div className="bg-dark-200/50 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
                <span className="text-4xl mb-3">🚀</span>
                <h3 className="font-display font-bold text-white mb-1">More Coming Soon</h3>
                <p className="text-gray-500 text-sm">New games are in development</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
