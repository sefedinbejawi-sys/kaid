import React from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { Article } from '../types';
import { 
  Clock, 
  Eye, 
  Bookmark, 
  LayoutGrid, 
  List as ListIcon, 
  Newspaper,
  Share2
} from 'lucide-react';

export const NewsGrid: React.FC = () => {
  const { 
    articles, 
    categories, 
    language, 
    activeCategory, 
    searchQuery, 
    setSelectedArticle,
    savedArticleIds,
    toggleSaveArticle,
    viewMode,
    setViewMode
  } = useNews();

  const t = translations[language];

  const getCategoryName = (slug: string) => {
    const cat = categories.find(c => c.slug === slug);
    if (!cat) return slug;
    return language === 'ar' ? cat.nameAr : cat.nameFr;
  };

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const title = (language === 'ar' ? art.titleAr : art.titleFr).toLowerCase();
    const excerpt = (language === 'ar' ? art.excerptAr : art.excerptFr).toLowerCase();
    const matchesSearch = !q || title.includes(q) || excerpt.includes(q) || art.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {activeCategory === 'all' ? t.latestNews : getCategoryName(activeCategory)}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {filteredArticles.length} {language === 'ar' ? 'مقال متاح' : 'articles disponibles'}
          </p>
        </div>

        {/* View Mode Controls (Functional buttons complying with frontend design rule) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            title="شبكة"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            title="قائمة"
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('magazine')}
            className={`p-1.5 rounded text-xs font-medium transition-colors ${viewMode === 'magazine' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            title="مجلة"
          >
            <Newspaper className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {t.noResults}
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : viewMode === 'magazine'
            ? 'space-y-6'
            : 'space-y-4'
        }>
          {filteredArticles.map((art) => {
            const isSaved = savedArticleIds.includes(art.id);
            const title = language === 'ar' ? art.titleAr : art.titleFr;
            const excerpt = language === 'ar' ? art.excerptAr : art.excerptFr;

            if (viewMode === 'list') {
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center"
                >
                  <img
                    src={art.imageUrl}
                    alt={title}
                    className="w-full sm:w-48 h-32 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="text-red-600 dark:text-red-400 font-bold">{getCategoryName(art.category)}</span>
                      <span>·</span>
                      <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {art.views}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {excerpt}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(art.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${isSaved ? 'text-red-600 bg-red-50 dark:bg-red-950/40' : 'text-slate-400 hover:text-slate-600'}`}
                    title="حفظ المقال"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              );
            }

            // Grid or Magazine View
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col ${
                  viewMode === 'magazine' ? 'sm:flex-row gap-6 p-4' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'magazine' ? 'sm:w-80 shrink-0 aspect-[16/10] sm:aspect-auto rounded-lg' : 'aspect-[16/10]'}`}>
                  <img
                    src={art.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
                    {getCategoryName(art.category)}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Static Metadata with typographic separators (Zero-Pill compliance) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(art.publishedAt).toLocaleDateString()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {art.views} {t.views}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 mb-2">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 group-hover:underline">
                      {t.readMore} →
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveArticle(art.id);
                      }}
                      className={`p-1.5 rounded transition-colors ${isSaved ? 'text-red-600 bg-red-50 dark:bg-red-950/40' : 'text-slate-400 hover:text-slate-600'}`}
                      title="حفظ المقال"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
