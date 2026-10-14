import React, { useState, useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { injectNewsArticleSchema } from '../utils/seo';
import { 
  X, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Aperture, 
  Send, 
  CheckCircle,
  MessageSquare,
  Tag
} from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { 
    selectedArticle, 
    setSelectedArticle, 
    language, 
    authors, 
    comments, 
    addComment,
    savedArticleIds,
    toggleSaveArticle,
    articles
  } = useNews();

  const t = translations[language];

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (selectedArticle) {
      injectNewsArticleSchema(selectedArticle, language);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedArticle, language]);

  if (!selectedArticle) return null;

  const title = language === 'ar' ? selectedArticle.titleAr : selectedArticle.titleFr;
  const content = language === 'ar' ? selectedArticle.contentAr : selectedArticle.contentFr;
  const author = authors.find(a => a.id === selectedArticle.authorId) || authors[0];
  const authorName = language === 'ar' ? author.nameAr : author.nameFr;
  const authorRole = language === 'ar' ? author.roleAr : author.roleFr;

  const articleComments = comments.filter(c => c.articleId === selectedArticle.id && c.approved);
  const isSaved = savedArticleIds.includes(selectedArticle.id);

  // Text to speech
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${title}. ${content}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'fr-FR';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentContent.trim()) {
      addComment(selectedArticle.id, commentName, commentContent);
      setCommentContent('');
      setCommentName('');
      setCommentSubmitted(true);
      setTimeout(() => setCommentSubmitted(false), 4000);
    }
  };

  const related = articles.filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200 dark:border-slate-800 relative">
        
        {/* Sticky Header inside Modal */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded">
              قائد نيوز · KAID NEWS
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              {new Date(selectedArticle.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded p-1 text-xs">
              <button onClick={() => setFontSize('normal')} className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 shadow-sm font-bold' : ''}`}>A</button>
              <button onClick={() => setFontSize('large')} className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 shadow-sm font-bold' : ''}`}>A+</button>
            </div>

            {/* Audio Reader TTS */}
            <button
              onClick={handleSpeak}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}
              title="استماع للمقال"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-600" />}
              <span className="hidden sm:inline">{isSpeaking ? t.stopListening : t.listenArticle}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleSaveArticle(selectedArticle.id)}
              className={`p-2 rounded transition-colors ${isSaved ? 'text-red-600 bg-red-50 dark:bg-red-950/40' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              title="حفظ المقال"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
              title="مشاركة"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow">
                  تم النسخ!
                </span>
              )}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setSelectedArticle(null);
              }}
              className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight font-serif">
              {title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img src={author.avatar} alt={authorName} className="w-12 h-12 rounded-full object-cover border-2 border-red-600" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{authorName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(selectedArticle.publishedAt).toLocaleString()}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedArticle.views} {t.views}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-md">
              <img src={selectedArticle.imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            {(selectedArticle.imageCaptionAr || selectedArticle.imageCaptionFr) && (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
                {language === 'ar' ? selectedArticle.imageCaptionAr : selectedArticle.imageCaptionFr}
              </p>
            )}
          </div>

          {/* Article Text Content */}
          <div className={`prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-loose whitespace-pre-line ${
            fontSize === 'xlarge' ? 'text-xl' : fontSize === 'large' ? 'text-lg' : 'text-base'
          }`}>
            {content}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-100 dark:border-slate-800">
            <Tag className="w-4 h-4 text-red-600" />
            {selectedArticle.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {t.relatedArticles}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedArticle(rel)}
                    className="group cursor-pointer bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-600 transition-all"
                  >
                    <img src={rel.imageUrl} alt="" className="w-full h-28 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600">
                      {language === 'ar' ? rel.titleAr : rel.titleFr}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.commentsTitle} ({articleComments.length})
              </h3>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {articleComments.length === 0 ? (
                <p className="text-sm text-slate-500 italic">كن اول من يعلق على هذا المقال.</p>
              ) : (
                articleComments.map((c) => (
                  <div key={c.id} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{c.authorName}</span>
                      <span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{c.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">أضف تعليقاً جديداً</h4>
              {commentSubmitted && (
                <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 p-3 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.commentPending}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder={t.yourName}
                  className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <textarea
                required
                rows={3}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={t.addComment}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow"
              >
                {t.submitComment}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
