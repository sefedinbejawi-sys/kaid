import React from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { Article } from '../types';
import { Clock, Eye, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { articles, language, setSelectedArticle, categories } = useNews();
  const t = translations[language];

  // Get featured articles or latest
  const featured = articles.filter(a => a.isFeatured) || articles;
  if (featured.length === 0) return null;

  const mainStory = featured[0];
  const sideStories = featured.slice(1, 3);

  const getCategoryName = (slug: string) => {
    const cat = categories.find(c => c.slug === slug);
    if (!cat) return slug;
    return language === 'ar' ? cat.nameAr : cat.nameFr;
  };

  return (
    <section className="py-6 bg-slate-900/40 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Hero Story (Takes 2 columns) */}
          {mainStory && (
            <div 
              onClick={() => setSelectedArticle(mainStory)}
              className="lg:col-span-2 group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                <img
                  src={mainStory.imageUrl}
                  alt={language === 'ar' ? mainStory.titleAr : mainStory.titleFr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded shadow">
                  {getCategoryName(mainStory.category)}
                </div>
                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <div className="flex items-center gap-3 text-xs text-slate-300 mb-2">
                    <span>{new Date(mainStory.publishedAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {mainStory.views}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight text-white group-hover:text-red-400 transition-colors">
                    {language === 'ar' ? mainStory.titleAr : mainStory.titleFr}
                  </h2>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {language === 'ar' ? mainStory.excerptAr : mainStory.excerptFr}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-semibold">{t.editorChoice}</span>
                  <span className="text-red-600 dark:text-red-400 font-bold group-hover:underline">
                    {t.readMore} ←
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Side Companion Stories */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-red-600">
              <Sparkles className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'ar' ? 'أبرز الأحداث' : 'En Vedette'}
              </h3>
            </div>

            {sideStories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedArticle(story)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-lg p-3 shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 flex gap-4 items-center"
              >
                <img
                  src={story.imageUrl}
                  alt={language === 'ar' ? story.titleAr : story.titleFr}
                  className="w-24 h-24 sm:w-28 sm:h-24 object-cover rounded-md shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-red-600 dark:text-red-400 font-semibold mb-1">
                    {getCategoryName(story.category)}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-red-500 transition-colors">
                    {language === 'ar' ? story.titleAr : story.titleFr}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {new Date(story.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
