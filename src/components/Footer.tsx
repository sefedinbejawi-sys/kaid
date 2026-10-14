import React from 'react';
import { useNews } from '../context/NewsContext';
import { translations } from '../utils/translations';
import { Globe, Shield, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, categories, setActiveCategory } = useNews();
  const t = translations[language];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* About column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow">
              ق
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-serif">{t.brandName}</h3>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{t.brandSubtitle}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ar' 
              ? 'صحيفة إلكترونية جزائرية وعالمية رائدة، تنقل الخبر بمصداقية وموضوعية على مدار الساعة باللغتين العربية والفرنسية.' 
              : 'Un journal électronique algérien et international de premier plan, rapportant l’actualité avec crédibilité 24h/24.'
            }
          </p>
        </div>

        {/* Categories Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {language === 'ar' ? 'الأقسام الرئيسية' : 'Rubriques'}
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    setActiveCategory(cat.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  {language === 'ar' ? cat.nameAr : cat.nameFr}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {language === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
          </h4>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>{language === 'ar' ? 'شارع محمد الخامس، الجزائر العاصمة' : 'Rue Mohamed V, Alger Centre'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>contact@kaidnews.dz</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span>+213 (0) 21 00 00 00</span>
            </div>
          </div>
        </div>

        {/* Legal & App info */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {language === 'ar' ? 'معلومات قانونية' : 'Informations légales'}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ar'
              ? 'معتمد لدى وزارة الاتصال برقم الاعتماد الرسمي. كافة المحتويات المنشورة محمية بموجب قوانين الملكية الفكرية.'
              : 'Agrément officiel du Ministère de la Communication. Tous droits réservés.'
            }
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>{t.rights}</p>
      </div>
    </footer>
  );
};
