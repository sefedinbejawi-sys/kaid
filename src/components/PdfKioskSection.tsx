import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { FileText, Download, Eye, Calendar, Sparkles } from 'lucide-react';

export const PdfKioskSection: React.FC = () => {
  const { pdfNewspapers, language, setSelectedPdf } = useNews();
  const t = translations[language];

  const [filterCat, setFilterCat] = useState<'all' | 'national' | 'international' | 'sport'>('all');

  const filteredPdfs = pdfNewspapers.filter(pdf => filterCat === 'all' || pdf.category === filterCat);

  return (
    <div className="space-y-6">
      {/* Kiosque Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black">{t.pdfKioskTitle}</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t.pdfKioskSubtitle}
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterCat('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterCat === 'all' ? 'bg-red-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {language === 'ar' ? 'جميع الجرائد' : 'Tous les journaux'}
          </button>
          <button
            onClick={() => setFilterCat('national')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterCat === 'national' ? 'bg-red-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {language === 'ar' ? 'الصحافة الوطنية' : 'Presse Nationale'}
          </button>
          <button
            onClick={() => setFilterCat('international')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterCat === 'international' ? 'bg-red-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {language === 'ar' ? 'الصحافة الدولية' : 'Presse Internationale'}
          </button>
          <button
            onClick={() => setFilterCat('sport')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterCat === 'sport' ? 'bg-red-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {language === 'ar' ? 'الصحافة الرياضية' : 'Presse Sportive'}
          </button>
        </div>
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPdfs.map((pdf) => {
          const title = language === 'ar' ? pdf.titleAr : pdf.titleFr;
          const publisher = language === 'ar' ? pdf.publisherAr : pdf.publisherFr;

          return (
            <div
              key={pdf.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col group"
            >
              {/* Cover Image Container */}
              <div 
                onClick={() => setSelectedPdf(pdf)}
                className="relative aspect-[3/4] overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={pdf.coverUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                  PDF
                </div>
                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <span className="text-[11px] text-red-300 font-semibold">{publisher}</span>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => setSelectedPdf(pdf)}
                    className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-red-600 cursor-pointer line-clamp-2 mb-2"
                  >
                    {title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {pdf.date}</span>
                    <span>·</span>
                    <span>{pdf.pagesCount} {t.pages}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedPdf(pdf)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.readPdf}</span>
                  </button>
                  <a
                    href={pdf.coverUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
                    title={t.downloadPdf}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
