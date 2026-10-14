import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { 
  Globe, 
  Sun, 
  Moon, 
  Bookmark, 
  Settings, 
  Search, 
  Menu, 
  X, 
  TrendingUp, 
  CloudSun, 
  DollarSign,
  ShieldCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    theme, 
    toggleTheme, 
    categories, 
    activeCategory, 
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    savedArticleIds,
    setIsBookmarksOpen,
    setIsCmsOpen
  } = useNews();

  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-slate-100 shadow-xl border-b border-slate-800">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Date, Weather, Currencies */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="font-medium text-slate-300">{currentDate}</span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <CloudSun className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الجزائر العاصمة 22°C مشمس' : 'Alger 22°C Ensoleillé'}</span>
            </div>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'دولار: 134.5 دج · يورو: 145.2 دج' : 'USD: 134.5 DZD · EUR: 145.2 DZD'}</span>
            </div>
          </div>

          {/* Controls: Language, Theme, Bookmarks, CMS */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition-colors text-xs font-semibold"
              title="تغيير اللغة / Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>{language === 'ar' ? 'Français' : 'العربية'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              title="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition-colors text-xs font-semibold relative"
            >
              <Bookmark className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">{t.savedArticles}</span>
              {savedArticleIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {savedArticleIds.length}
                </span>
              )}
            </button>

            {/* CMS Dashboard Button */}
            <button
              onClick={() => setIsCmsOpen(true)}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded transition-colors text-xs font-bold shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.adminDashboard}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Masthead / Logo & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/30 border border-red-500/30">
            <span className="text-2xl font-black text-white tracking-wider">ق</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                {language === 'ar' ? 'قائد نيوز' : 'Kaid News'}
              </h1>
              <span className="bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                DZ
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-950 border-t border-slate-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-red-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.home}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeCategory === cat.slug 
                    ? 'bg-red-600 text-white shadow' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameFr}
              </button>
            ))}
            {/* PDF Kiosk Tab */}
            <button
              onClick={() => setActiveCategory('pdf-kiosque')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'pdf-kiosque' 
                  ? 'bg-amber-600 text-white shadow' 
                  : 'text-amber-400 hover:bg-slate-800/60'
              }`}
            >
              <span>📄</span>
              <span>{t.pdfNewspapers}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center justify-between w-full py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`text-sm font-semibold px-3 py-1.5 rounded ${activeCategory === 'all' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
              >
                {t.home}
              </button>
              <button
                onClick={() => setActiveCategory('pdf-kiosque')}
                className={`text-sm font-bold px-3 py-1.5 rounded ${activeCategory === 'pdf-kiosque' ? 'bg-amber-600 text-white' : 'text-amber-400 bg-slate-800'}`}
              >
                {t.pdfNewspapers}
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 bg-slate-800 text-slate-200 px-3 py-1.5 rounded text-sm font-medium"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{language === 'ar' ? 'الأقسام' : 'Rubriques'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 p-4 grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className={`text-right px-3 py-2 text-sm rounded transition-colors ${
                  activeCategory === cat.slug ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameFr}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
