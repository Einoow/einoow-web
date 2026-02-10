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
      {/* Hero Section - Mobile: Overlay | Desktop: Split Layout (Steam-style) */}
      {featuredGame && (
        <section className="relative">
          {/* === MOBILE LAYOUT (sm and below): Overlay style === */}
          <div className="md:hidden relative">
            {/* Hero Image - Full width, controlled height */}
            <div className="relative h-[280px] sm:h-[360px] overflow-hidden">
              {featuredGame.image ? (
                <img
                  src={featuredGame.image}
                  alt={featuredGame.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-900 to-dark-300 flex items-center justify-center">
                  <span className="text-6xl">🎮</span>
                </div>
              )}
              
              {/* Gradient overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-300/80 via-transparent to-transparent" />
            </div>
            
            {/* Content overlay - positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              {/* Featured badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-500/90 backdrop-blur-sm text-white rounded-md text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
              
              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2 drop-shadow-lg">
                {featuredGame.name}
              </h1>
              
              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base mb-3 sm:mb-4 max-w-xl line-clamp-2 drop-shadow">
                {featuredGame.description}
              </p>
              
              {/* Tags + CTA row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleGameClick(featuredGame)}
                  className="px-5 py-2.5 sm:px-8 sm:py-3 bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play Now
                </button>
                
                {featuredGame.tags && featuredGame.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {featuredGame.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300 capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* === DESKTOP LAYOUT (md and up): Split layout Steam-style === */}
          <div className="hidden md:flex flex-col min-h-[calc(100vh-80px)]">
            {/* Main content - centered */}
            <div className="flex-1 flex items-center py-12 lg:py-16 px-6 lg:px-8">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Game artwork with controlled aspect ratio */}
                <div className="col-span-7 lg:col-span-8">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                    {/* 16:9 aspect ratio container */}
                    <div className="aspect-video">
                      {featuredGame.image ? (
                        <img
                          src={featuredGame.image}
                          alt={featuredGame.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-900 to-dark-300 flex items-center justify-center">
                          <span className="text-8xl">🎮</span>
                        </div>
                      )}
                    </div>
                    {/* Subtle gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Right: Content column */}
                <div className="col-span-5 lg:col-span-4 flex flex-col justify-center">
                  {/* Featured badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wide mb-4 w-fit">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Game
                  </span>
                  
                  {/* Title */}
                  <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                    {featuredGame.name}
                  </h1>
                  
                  {/* Description - full, no line clamp */}
                  <p className="text-gray-300 text-base lg:text-lg mb-6 leading-relaxed">
                    {featuredGame.description}
                  </p>
                  
                  {/* Tags */}
                  {featuredGame.tags && featuredGame.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredGame.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-dark-200 border border-white/10 rounded-lg text-sm text-gray-300 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* CTA Button - Full width on this column, GREEN for max contrast */}
                  <button
                    onClick={() => handleGameClick(featuredGame)}
                    className="w-full px-8 py-4 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play Now
                  </button>
                </div>
              </div>
            </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="pb-6 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-500 text-sm">More games</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* Games Section */}
      <section className="py-6 sm:py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {featuredGame ? 'More Games' : 'All Games'}
            </h2>
            {games.length > 3 && (
              <span className="text-sm text-gray-500">
                {games.length} games
              </span>
            )}
          </div>
          
          {games.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <span className="text-5xl sm:text-6xl mb-4 block">🎮</span>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                No games yet
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Check back soon for new games!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(featuredGame ? otherGames : games).map((game) => (
                <GameCard key={game.id} game={game} onClick={handleGameClick} />
              ))}
              
              {/* Coming soon placeholder */}
              <div className="bg-dark-200/50 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center p-6 sm:p-8 text-center min-h-[200px] sm:min-h-[280px]">
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">🚀</span>
                <h3 className="font-display font-bold text-white text-sm sm:text-base mb-1">More Coming Soon</h3>
                <p className="text-gray-500 text-xs sm:text-sm">New games in development</p>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Subtle bottom decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
