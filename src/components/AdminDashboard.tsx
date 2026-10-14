import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { Article, PdfNewspaper } from '../types';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  RefreshCw, 
  Globe2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isCmsOpen, 
    setIsCmsOpen, 
    articles, 
    categories, 
    authors, 
    comments, 
    pdfNewspapers,
    language, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    addPdfNewspaper,
    deletePdfNewspaper,
    approveComment, 
    deleteComment, 
    resetToDemo 
  } = useNews();

  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'articles' | 'pdf' | 'comments' | 'seo'>('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isAddingPdf, setIsAddingPdf] = useState(false);

  // Form state for Article Add/Edit
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formTitleFr, setFormTitleFr] = useState('');
  const [formExcerptAr, setFormExcerptAr] = useState('');
  const [formExcerptFr, setFormExcerptFr] = useState('');
  const [formContentAr, setFormContentAr] = useState('');
  const [formContentFr, setFormContentFr] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.slug || 'algeria');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formTags, setFormTags] = useState('');

  // Form state for PDF Newspaper Add
  const [pdfTitleAr, setPdfTitleAr] = useState('');
  const [pdfTitleFr, setPdfTitleFr] = useState('');
  const [pdfPublisherAr, setPdfPublisherAr] = useState('');
  const [pdfPublisherFr, setPdfPublisherFr] = useState('');
  const [pdfCategory, setPdfCategory] = useState<'national' | 'international' | 'sport'>('national');
  const [pdfCoverUrl, setPdfCoverUrl] = useState('');
  const [pdfPages, setPdfPages] = useState('24');

  if (!isCmsOpen) return null;

  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const pendingComments = comments.filter(c => !c.approved);

  const openAddModal = () => {
    setEditingArticle(null);
    setFormTitleAr('');
    setFormTitleFr('');
    setFormExcerptAr('');
    setFormExcerptFr('');
    setFormContentAr('');
    setFormContentFr('');
    setFormCategory('algeria');
    setFormImageUrl('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1000');
    setFormIsBreaking(false);
    setFormIsFeatured(false);
    setFormTags('الجزائر, أخبار');
    setIsAddingNew(true);
  };

  const openEditModal = (art: Article) => {
    setEditingArticle(art);
    setFormTitleAr(art.titleAr);
    setFormTitleFr(art.titleFr);
    setFormExcerptAr(art.excerptAr);
    setFormExcerptFr(art.excerptFr);
    setFormContentAr(art.contentAr);
    setFormContentFr(art.contentFr);
    setFormCategory(art.category);
    setFormImageUrl(art.imageUrl);
    setFormIsBreaking(!!art.isBreaking);
    setFormIsFeatured(!!art.isFeatured);
    setFormTags(art.tags.join(', '));
    setIsAddingNew(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingArticle) {
      updateArticle({
        ...editingArticle,
        titleAr: formTitleAr,
        titleFr: formTitleFr,
        excerptAr: formExcerptAr,
        excerptFr: formExcerptFr,
        contentAr: formContentAr,
        contentFr: formContentFr,
        category: formCategory,
        imageUrl: formImageUrl,
        isBreaking: formIsBreaking,
        isFeatured: formIsFeatured,
        tags: tagsArray
      });
    } else {
      addArticle({
        titleAr: formTitleAr,
        titleFr: formTitleFr,
        excerptAr: formExcerptAr,
        excerptFr: formExcerptFr,
        contentAr: formContentAr,
        contentFr: formContentFr,
        category: formCategory,
        imageUrl: formImageUrl,
        authorId: authors[0].id,
        isBreaking: formIsBreaking,
        isFeatured: formIsFeatured,
        tags: tagsArray
      });
    }
    setIsAddingNew(false);
    setEditingArticle(null);
  };

  const handleSavePdf = (e: React.FormEvent) => {
    e.preventDefault();
    addPdfNewspaper({
      titleAr: pdfTitleAr,
      titleFr: pdfTitleFr,
      publisherAr: pdfPublisherAr || 'قائد نيوز',
      publisherFr: pdfPublisherFr || 'Kaid News',
      category: pdfCategory,
      coverUrl: pdfCoverUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800',
      pdfUrl: '#',
      date: new Date().toISOString().split('T')[0],
      pagesCount: parseInt(pdfPages) || 24
    });
    setIsAddingPdf(false);
    setPdfTitleAr('');
    setPdfTitleFr('');
    setPdfPublisherAr('');
    setPdfPublisherFr('');
    setPdfCoverUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex justify-center items-start overflow-y-auto p-2 sm:p-4">
      <div className="bg-slate-900 text-slate-100 w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-800">
        
        {/* Top Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{t.cmsTitle}</h2>
              <p className="text-xs text-slate-400">{t.cmsSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('هل تريد إعادة تعيين كافة المقالات والجرائد والبيانات الافتراضية؟')) {
                  resetToDemo();
                }
              }}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>{t.resetDemoData}</span>
            </button>
            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-xs mb-1">{t.statsArticles}</div>
            <div className="text-2xl font-black text-white">{articles.length}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-xs mb-1">الجرائد PDF</div>
            <div className="text-2xl font-black text-amber-400">{pdfNewspapers.length}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-xs mb-1">{t.statsComments}</div>
            <div className="text-2xl font-black text-amber-400">{pendingComments.length}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-xs mb-1">{t.statsViews}</div>
            <div className="text-2xl font-black text-red-400">{totalViews.toLocaleString()}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'articles' ? 'border-red-600 text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.tabArticles}</span>
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'pdf' ? 'border-amber-600 text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <span>📄</span>
            <span>{t.tabPdf} ({pdfNewspapers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'comments' ? 'border-red-600 text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.tabComments} ({pendingComments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'seo' ? 'border-red-600 text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Globe2 className="w-4 h-4" />
            <span>{t.tabSeo}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">إدارة المقالات الإخبارية</h3>
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addNewArticle}</span>
                </button>
              </div>

              {/* Add / Edit Form Modal */}
              {isAddingNew && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-red-500/30 shadow-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-base text-white">
                      {editingArticle ? t.editArticle : t.addNewArticle}
                    </h4>
                    <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.titleArLabel}</label>
                        <input
                          type="text"
                          required
                          value={formTitleAr}
                          onChange={(e) => setFormTitleAr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.titleFrLabel}</label>
                        <input
                          type="text"
                          required
                          value={formTitleFr}
                          onChange={(e) => setFormTitleFr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.excerptArLabel}</label>
                        <textarea
                          rows={2}
                          required
                          value={formExcerptAr}
                          onChange={(e) => setFormExcerptAr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.excerptFrLabel}</label>
                        <textarea
                          rows={2}
                          required
                          value={formExcerptFr}
                          onChange={(e) => setFormExcerptFr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.contentArLabel}</label>
                        <textarea
                          rows={5}
                          required
                          value={formContentAr}
                          onChange={(e) => setFormContentAr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.contentFrLabel}</label>
                        <textarea
                          rows={5}
                          required
                          value={formContentFr}
                          onChange={(e) => setFormContentFr(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.categoryLabel}</label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        >
                          {categories.map(c => (
                            <option key={c.slug} value={c.slug}>{c.nameAr} / {c.nameFr}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.imageUrlLabel}</label>
                        <input
                          type="url"
                          required
                          value={formImageUrl}
                          onChange={(e) => setFormImageUrl(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">{t.tagsLabel}</label>
                        <input
                          type="text"
                          value={formTags}
                          onChange={(e) => setFormTags(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-6 pt-4">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                          <input
                            type="checkbox"
                            checked={formIsBreaking}
                            onChange={(e) => setFormIsBreaking(e.target.checked)}
                            className="w-4 h-4 accent-red-600 rounded"
                          />
                          <span>{t.isBreakingCheck}</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                          <input
                            type="checkbox"
                            checked={formIsFeatured}
                            onChange={(e) => setFormIsFeatured(e.target.checked)}
                            className="w-4 h-4 accent-red-600 rounded"
                          />
                          <span>{t.isFeaturedCheck}</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        {t.cancel}
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-xs font-bold shadow"
                      >
                        {t.save}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Articles Table */}
              <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">العنوان</th>
                        <th className="p-3">القسم</th>
                        <th className="p-3">تاريخ النشر</th>
                        <th className="p-3">المشاهدات</th>
                        <th className="p-3 text-center">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {articles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-3 font-bold text-white max-w-xs truncate">{art.titleAr}</td>
                          <td className="p-3 text-slate-300">{art.category}</td>
                          <td className="p-3 text-slate-400">{new Date(art.publishedAt).toLocaleDateString()}</td>
                          <td className="p-3 text-red-400 font-mono font-bold">{art.views}</td>
                          <td className="p-3 flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditModal(art)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                              title="تعديل"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
                                  deleteArticle(art.id);
                                }
                              }}
                              className="p-1.5 rounded bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">إدارة الجرائد والنسخ الرقمية PDF</h3>
                <button
                  onClick={() => setIsAddingPdf(!isAddingPdf)}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة جريدة PDF جديدة</span>
                </button>
              </div>

              {isAddingPdf && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
                  <h4 className="font-bold text-sm text-white">إضافة طبعة PDF ورقية جديدة</h4>
                  <form onSubmit={handleSavePdf} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الجريدة (عربي)</label>
                        <input
                          type="text"
                          required
                          value={pdfTitleAr}
                          onChange={(e) => setPdfTitleAr(e.target.value)}
                          placeholder="مثال: جريدة الخبر - العدد اليومي"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الجريدة (فرنسي)</label>
                        <input
                          type="text"
                          required
                          value={pdfTitleFr}
                          onChange={(e) => setPdfTitleFr(e.target.value)}
                          placeholder="Ex: El Khabar - Edition du jour"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">الناشر (عربي)</label>
                        <input
                          type="text"
                          value={pdfPublisherAr}
                          onChange={(e) => setPdfPublisherAr(e.target.value)}
                          placeholder="دار الخبر"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">التصنيف</label>
                        <select
                          value={pdfCategory}
                          onChange={(e) => setPdfCategory(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                        >
                          <option value="national">وطنية (Nationale)</option>
                          <option value="international">دولية (Internationale)</option>
                          <option value="sport">رياضية (Sportive)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">عدد الصفحات</label>
                        <input
                          type="number"
                          value={pdfPages}
                          onChange={(e) => setPdfPages(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رابط صورة الغلاف (URL)</label>
                      <input
                        type="url"
                        required
                        value={pdfCoverUrl}
                        onChange={(e) => setPdfCoverUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingPdf(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg text-xs font-bold shadow"
                      >
                        حفظ ونشر الجريدة
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">الغلاف</th>
                        <th className="p-3">العنوان</th>
                        <th className="p-3">الناشر</th>
                        <th className="p-3">التاريخ</th>
                        <th className="p-3 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {pdfNewspapers.map((pdf) => (
                        <tr key={pdf.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-2">
                            <img src={pdf.coverUrl} alt="" className="w-10 h-14 object-cover rounded" />
                          </td>
                          <td className="p-3 font-bold text-white">{pdf.titleAr}</td>
                          <td className="p-3 text-slate-300">{pdf.publisherAr}</td>
                          <td className="p-3 text-slate-400">{pdf.date}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                if (window.confirm('هل تريد حذف هذه الجريدة؟')) {
                                  deletePdfNewspaper(pdf.id);
                                }
                              }}
                              className="p-1.5 rounded bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">مراجعة وموافقة التعليقات</h3>
              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-slate-400 text-sm">لا توجد تعليقات حالياً.</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{c.authorName}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${c.approved ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                            {c.approved ? 'منشور' : 'قيد الانتظار'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{c.content}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!c.approved && (
                          <button
                            onClick={() => approveComment(c.id)}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.approve}</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="bg-red-950 hover:bg-red-900 text-red-300 px-3 py-1.5 rounded text-xs font-bold transition-colors"
                        >
                          {t.deleteArticle}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-red-500" />
                  <span>{t.seoInspectorTitle}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.seoDesc}
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  {`{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "الجزائر تطلق استراتيجية وطنية كبرى للتحول الرقمي",
  "publisher": {
    "@type": "Organization",
    "name": "قائد نيوز | Kaid News"
  }
}`}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
