import { useSEO } from '../hooks/useSEO';

export function AboutPage() {
  useSEO({
    title: 'About',
    description: 'Learn about Einoow - creating fun and innovative web games. Making games is fun.',
    canonicalPath: '/about',
  });

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header - Compact on mobile */}
        <div className="flex items-center gap-4 sm:flex-col sm:text-center mb-6 sm:mb-12">
          <img 
            src="/einoow_logo.png" 
            alt="Einoow" 
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain flex-shrink-0"
          />
          <div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-4">
              About Einoow
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg italic">
              Making games is fun.
            </p>
          </div>
        </div>

        {/* Bio */}
        <section className="bg-dark-200 rounded-xl border border-white/5 p-4 sm:p-8 mb-4 sm:mb-8">
          <div className="space-y-3 sm:space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              Life itself is the ultimate game; everything we design is a small window into that truth.
            </p>
            <p className="text-sm sm:text-base text-white/60">
              Hope you enjoy what I create!
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="bg-dark-200 rounded-xl border border-white/5 p-4 sm:p-8">
          <h2 className="font-display text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
            Connect
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <a
              href="https://x.com/einoow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 sm:p-4 bg-dark-100 rounded-lg hover:bg-dark-100/70 active:scale-[0.98] transition-all group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-white text-sm sm:text-base font-medium group-hover:text-primary-400 transition-colors">
                  X
                </span>
                <p className="text-gray-500 text-xs sm:text-sm truncate">@einoow</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 sm:p-4 bg-dark-100 rounded-lg opacity-50 cursor-not-allowed">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#5865F2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-white text-sm sm:text-base font-medium">
                  Discord
                </span>
                <p className="text-gray-500 text-xs sm:text-sm">Coming soon</p>
              </div>
            </div>

            <a
              href="mailto:hello@einoow.com"
              className="flex items-center gap-3 p-3 sm:p-4 bg-dark-100 rounded-lg hover:bg-dark-100/70 active:scale-[0.98] transition-all group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-white text-sm sm:text-base font-medium group-hover:text-primary-400 transition-colors">
                  Email
                </span>
                <p className="text-gray-500 text-xs sm:text-sm truncate">hello@einoow.com</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
