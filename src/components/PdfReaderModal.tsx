import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { X, Download, FileText, ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';

export const PdfReaderModal: React.FC = () => {
  const { selectedPdf, setSelectedPdf, language } = useNews();
  const t = translations[language];

  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!selectedPdf) return null;

  const title = language === 'ar' ? selectedPdf.titleAr : selectedPdf.titleFr;
  const publisher = language === 'ar' ? selectedPdf.publisherAr : selectedPdf.publisherFr;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-red-500" />
          <div>
            <h3 className="font-bold text-sm sm:text-base line-clamp-1">{title}</h3>
            <p className="text-xs text-slate-400">{publisher} · {selectedPdf.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <span>الصفحة {currentPage} / {selectedPdf.pagesCount}</span>
          </div>

          <a
            href={selectedPdf.coverUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t.downloadPdf}</span>
          </a>

          <button
            onClick={() => setSelectedPdf(null)}
            className="p-2 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Viewport */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-center bg-slate-950">
        <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden max-w-3xl w-full flex flex-col items-center p-6 transition-all" style={{ transform: `scale(${zoomLevel / 100})` }}>
          <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold">
            {publisher}
          </div>
          <img
            src={selectedPdf.coverUrl}
            alt={title}
            className="w-full max-h-[70vh] object-contain rounded border border-slate-200 shadow mb-6"
          />
          <div className="text-center space-y-2">
            <h4 className="font-bold text-lg text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{selectedPdf.date} — {selectedPdf.pagesCount} {t.pages}</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>
          <span className="text-xs font-mono">{currentPage} / {selectedPdf.pagesCount}</span>
          <button
            disabled={currentPage >= selectedPdf.pagesCount}
            onClick={() => setCurrentPage(p => Math.min(selectedPdf.pagesCount, p + 1))}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs flex items-center gap-1"
          >
            <span>التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(z => Math.max(70, z - 15))}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
            title="تصغير"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(z => Math.min(150, z + 15))}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs"
            title="تكبير"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
