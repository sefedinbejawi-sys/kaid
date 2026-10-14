import React from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { Flame } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const { articles, language, setSelectedArticle } = useNews();
  const t = translations[language];

  const breakingArticles = articles.filter(a => a.isBreaking);

  if (breakingArticles.length === 0) return null;

  return (
    <div className="bg-red-950/90 border-b border-red-900/60 text-white py-2.5 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden">
        {/* Urgent Badge */}
        <div className="flex items-center gap-1.5 bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded shadow animate-pulse shrink-0">
          <Flame className="w-3.5 h-3.5" />
          <span>{t.breakingNews}</span>
        </div>

        {/* Ticker Content */}
        <div className="overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-8 py-0.5">
          {breakingArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="inline-flex items-center gap-2 cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              <span className="text-xs sm:text-sm font-semibold text-red-100 group-hover:text-white group-hover:underline transition-colors">
                {language === 'ar' ? art.titleAr : art.titleFr}
              </span>
              <span className="text-[10px] text-red-300 font-mono">
                ({new Date(art.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
