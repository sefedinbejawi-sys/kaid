import React from 'react';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { HeroSection } from './components/HeroSection';
import { NewsGrid } from './components/NewsGrid';
import { Sidebar } from './components/Sidebar';
import { ArticleModal } from './components/ArticleModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PdfKioskSection } from './components/PdfKioskSection';
import { PdfReaderModal } from './components/PdfReaderModal';
import { Footer } from './components/Footer';
import { Home, Bookmark, ShieldCheck, FileText } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeCategory } = useNews();

  if (activeCategory === 'pdf-kiosque') {
    return (
      <div className="w-full py-4">
        <PdfKioskSection />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <NewsGrid />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

const MobileBottomNav: React.FC = () => {
  const { setActiveCategory, setSearchQuery, setIsBookmarksOpen, setIsCmsOpen, savedArticleIds } = useNews();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex justify-around items-center sm:hidden shadow-2xl">
      <button
        onClick={() => { setActiveCategory('all'); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex flex-col items-center text-slate-400 hover:text-red-500 text-[10px] font-bold"
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>الرئيسية</span>
      </button>

      <button
        onClick={() => setActiveCategory('pdf-kiosque')}
        className="flex flex-col items-center text-slate-400 hover:text-amber-500 text-[10px] font-bold"
      >
        <FileText className="w-5 h-5 mb-0.5 text-amber-400" />
        <span>الجرائد PDF</span>
      </button>

      <button
        onClick={() => setIsBookmarksOpen(true)}
        className="flex flex-col items-center text-slate-400 hover:text-red-500 text-[10px] font-bold relative"
      >
        <Bookmark className="w-5 h-5 mb-0.5" />
        <span>المحفوظات</span>
        {savedArticleIds.length > 0 && (
          <span className="absolute -top-1 right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
            {savedArticleIds.length}
          </span>
        )}
      </button>

      <button
        onClick={() => setIsCmsOpen(true)}
        className="flex flex-col items-center text-slate-400 hover:text-red-500 text-[10px] font-bold"
      >
        <ShieldCheck className="w-5 h-5 mb-0.5 text-red-500" />
        <span>لوحة التحكم</span>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans pb-16 sm:pb-0">
        <Header />
        <BreakingTicker />
        <HeroSection />

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <MainContent />
        </main>

        <Footer />
        <MobileBottomNav />

        <ArticleModal />
        <BookmarksModal />
        <PdfReaderModal />
        <AdminDashboard />
      </div>
    </NewsProvider>
  );
}
