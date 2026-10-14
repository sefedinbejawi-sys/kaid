import React from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { X, Bookmark, Trash2, Clock } from 'lucide-react';

export const BookmarksModal: React.FC = () => {
  const { 
    isBookmarksOpen, 
    setIsBookmarksOpen, 
    savedArticleIds, 
    articles, 
    language, 
    setSelectedArticle,
    toggleSaveArticle 
  } = useNews();

  const t = translations[language];

  if (!isBookmarksOpen) return null;

  const savedArticles = articles.filter(a => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-600 fill-current" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t.savedArticles} ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={() => setIsBookmarksOpen(false)}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">{t.noSavedArticles}</p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  setSelectedArticle(art);
                  setIsBookmarksOpen(false);
                }}
                className="group cursor-pointer bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-600 transition-all flex gap-3 items-center"
              >
                <img src={art.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 mb-1">
                    {language === 'ar' ? art.titleAr : art.titleFr}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {new Date(art.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveArticle(art.id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="إزالة من المحفوظات"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
