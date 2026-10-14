import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { 
  TrendingUp, 
  BarChart2, 
  Send, 
  CheckCircle2, 
  Flame, 
  Tag,
  Check
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { articles, language, setSelectedArticle, poll, votePoll, categories } = useNews();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);

  // Most read articles (sorted by views)
  const mostRead = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Extract all unique tags
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

  return (
    <aside className="space-y-6">
      {/* Most Read Box */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <TrendingUp className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            {t.mostRead}
          </h3>
        </div>

        <div className="space-y-4">
          {mostRead.map((art, index) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <span className="font-serif text-2xl font-black text-red-600 dark:text-red-500 w-6 shrink-0 text-center">
                0{index + 1}
              </span>
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 transition-colors line-clamp-2">
                  {language === 'ar' ? art.titleAr : art.titleFr}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span>{art.views} {t.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Poll of the Day Box */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <BarChart2 className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            {t.pollTitle}
          </h3>
        </div>

        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
          {language === 'ar' ? poll.questionAr : poll.questionFr}
        </p>

        <div className="space-y-2.5">
          {poll.options.map((opt) => {
            const percentage = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
            const isSelected = votedOption === opt.id;

            return (
              <div key={opt.id} className="space-y-1">
                <button
                  disabled={votedOption !== null}
                  onClick={() => {
                    setVotedOption(opt.id);
                    votePoll(opt.id);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs font-medium flex justify-between items-center transition-all ${
                    isSelected 
                      ? 'bg-red-600 text-white font-bold' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {language === 'ar' ? opt.textAr : opt.textFr}
                  </span>
                  <span className="font-mono text-[11px]">{percentage}%</span>
                </button>
                {votedOption !== null && (
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-[11px] text-slate-400 mt-3 text-center">
          {t.totalVotes} <span className="font-bold">{poll.totalVotes}</span>
        </div>
      </div>

      {/* Newsletter Signup Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-5 shadow-lg border border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-red-500">
          <Send className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">
            {t.newsletterTitle}
          </h3>
        </div>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          {t.newsletterDesc}
        </p>

        {subscribed ? (
          <div className="bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 p-3 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.subscribeSuccess}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition-colors shadow"
            >
              {t.subscribeBtn}
            </button>
          </form>
        )}
      </div>

      {/* Trending Hashtags Cloud */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <Tag className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t.trendingTags}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};
