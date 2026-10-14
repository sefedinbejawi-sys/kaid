import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Category, Author, Comment, Poll, PdfNewspaper, Language, Theme } from '../types';
import { INITIAL_ARTICLES, CATEGORIES, INITIAL_AUTHORS, INITIAL_POLL } from '../data/mockNews';
import { INITIAL_PDF_NEWSPAPERS } from '../data/mockPdfNewspapers';

interface NewsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  articles: Article[];
  categories: Category[];
  authors: Author[];
  comments: Comment[];
  poll: Poll;
  pdfNewspapers: PdfNewspaper[];
  savedArticleIds: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;
  selectedPdf: PdfNewspaper | null;
  setSelectedPdf: (pdf: PdfNewspaper | null) => void;
  isCmsOpen: boolean;
  setIsCmsOpen: (isOpen: boolean) => void;
  isBookmarksOpen: boolean;
  setIsBookmarksOpen: (isOpen: boolean) => void;
  toggleSaveArticle: (id: string) => void;
  votePoll: (optionId: string) => void;
  addComment: (articleId: string, authorName: string, content: string) => void;
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'views' | 'likes'>) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  addPdfNewspaper: (pdf: Omit<PdfNewspaper, 'id'>) => void;
  deletePdfNewspaper: (id: string) => void;
  approveComment: (id: string) => void;
  deleteComment: (id: string) => void;
  resetToDemo: () => void;
  viewMode: 'grid' | 'list' | 'magazine';
  setViewMode: (mode: 'grid' | 'list' | 'magazine') => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kaid_lang') as Language) || 'ar';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('kaid_theme') as Theme) || 'dark';
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('kaid_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [pdfNewspapers, setPdfNewspapers] = useState<PdfNewspaper[]>(() => {
    const saved = localStorage.getItem('kaid_pdfs');
    return saved ? JSON.parse(saved) : INITIAL_PDF_NEWSPAPERS;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('kaid_comments');
    return saved ? JSON.parse(saved) : [
      {
        id: 'c-1',
        articleId: 'art-1',
        authorName: 'سليم معمري',
        content: 'خطوة مباركة نحو عصرنة الإدارة العمومية وتسهيل المعاملات للشباب.',
        createdAt: '2026-10-11T09:00:00Z',
        approved: true
      }
    ];
  });

  const [poll, setPoll] = useState<Poll>(() => {
    const saved = localStorage.getItem('kaid_poll');
    return saved ? JSON.parse(saved) : INITIAL_POLL;
  });

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('kaid_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<PdfNewspaper | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'magazine'>('grid');

  useEffect(() => {
    localStorage.setItem('kaid_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('kaid_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kaid_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('kaid_pdfs', JSON.stringify(pdfNewspapers));
  }, [pdfNewspapers]);

  useEffect(() => {
    localStorage.setItem('kaid_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('kaid_poll', JSON.stringify(poll));
  }, [poll]);

  useEffect(() => {
    localStorage.setItem('kaid_saved', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  const toggleSaveArticle = (id: string) => {
    if (savedArticleIds.includes(id)) {
      setSavedArticleIds(savedArticleIds.filter(i => i !== id));
    } else {
      setSavedArticleIds([...savedArticleIds, id]);
    }
  };

  const votePoll = (optionId: string) => {
    const updatedOptions = poll.options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });
    setPoll({
      ...poll,
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1
    });
  };

  const addComment = (articleId: string, authorName: string, content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      authorName,
      content,
      createdAt: new Date().toISOString(),
      approved: false
    };
    setComments([newComment, ...comments]);
  };

  const addArticle = (artData: Omit<Article, 'id' | 'publishedAt' | 'views' | 'likes'>) => {
    const newArt: Article = {
      ...artData,
      id: `art-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      views: Math.floor(Math.random() * 500) + 50,
      likes: 0
    };
    setArticles([newArt, ...articles]);
  };

  const updateArticle = (updated: Article) => {
    setArticles(articles.map(a => a.id === updated.id ? updated : a));
    if (selectedArticle?.id === updated.id) {
      setSelectedArticle(updated);
    }
  };

  const deleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  const addPdfNewspaper = (pdfData: Omit<PdfNewspaper, 'id'>) => {
    const newPdf: PdfNewspaper = {
      ...pdfData,
      id: `pdf-${Date.now()}`
    };
    setPdfNewspapers([newPdf, ...pdfNewspapers]);
  };

  const deletePdfNewspaper = (id: string) => {
    setPdfNewspapers(pdfNewspapers.filter(p => p.id !== id));
    if (selectedPdf?.id === id) {
      setSelectedPdf(null);
    }
  };

  const approveComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const resetToDemo = () => {
    setArticles(INITIAL_ARTICLES);
    setPdfNewspapers(INITIAL_PDF_NEWSPAPERS);
    setComments([
      {
        id: 'c-1',
        articleId: 'art-1',
        authorName: 'سليم معمري',
        content: 'خطوة مباركة نحو عصرنة الإدارة العمومية وتسهيل المعاملات للشباب.',
        createdAt: '2026-10-11T09:00:00Z',
        approved: true
      }
    ]);
    setPoll(INITIAL_POLL);
    localStorage.clear();
  };

  return (
    <NewsContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        toggleLanguage,
        articles,
        categories: CATEGORIES,
        authors: INITIAL_AUTHORS,
        comments,
        poll,
        pdfNewspapers,
        savedArticleIds,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedArticle,
        setSelectedArticle,
        selectedPdf,
        setSelectedPdf,
        isCmsOpen,
        setIsCmsOpen,
        isBookmarksOpen,
        setIsBookmarksOpen,
        toggleSaveArticle,
        votePoll,
        addComment,
        addArticle,
        updateArticle,
        deleteArticle,
        addPdfNewspaper,
        deletePdfNewspaper,
        approveComment,
        deleteComment,
        resetToDemo,
        viewMode,
        setViewMode
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
