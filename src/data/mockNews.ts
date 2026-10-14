import { Article, Category, Author, Poll } from '../types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'auth-1',
    nameAr: 'عبد القادر بن عيسى',
    nameFr: 'Abdelkader Benaissa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    roleAr: 'رئيس التحرير التنفيذي',
    roleFr: 'Rédacteur en Chef Exécutif',
  },
  {
    id: 'auth-2',
    nameAr: 'ياسمين بلقاسم',
    nameFr: 'Yasmina Belkacem',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    roleAr: 'صحفية أولى - قسم الشؤون الوطنية',
    roleFr: 'Journaliste Senior - Politique Nationale',
  },
  {
    id: 'auth-3',
    nameAr: 'كريم مرابطي',
    nameFr: 'Karim Merabet',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    roleAr: 'محلل اقتصادي ومالي',
    roleFr: 'Analyste Économique et Financier',
  },
  {
    id: 'auth-4',
    nameAr: 'دليلة عمراوي',
    nameFr: 'Dalila Amraoui',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    roleAr: 'مسؤولة القسم الثقافي والدولي',
    roleFr: 'Responsable Culture & International',
  },
];

export const CATEGORIES: Category[] = [
  { id: 'algeria', nameAr: 'الجزائر', nameFr: 'Algérie', slug: 'algeria' },
  { id: 'local', nameAr: 'الأخبار المحلية', nameFr: 'Local', slug: 'local' },
  { id: 'economy', nameAr: 'الاقتصاد', nameFr: 'Économie', slug: 'economy' },
  { id: 'sport', nameAr: 'الرياضة', nameFr: 'Sport', slug: 'sport' },
  { id: 'culture', nameAr: 'الثقافة والمجتمع', nameFr: 'Culture & Société', slug: 'culture' },
  { id: 'tech', nameAr: 'التكنولوجيا والذكاء الاصطناعي', nameFr: 'Tech & Innovation', slug: 'tech' },
  { id: 'world', nameAr: 'العالم', nameFr: 'Monde', slug: 'world' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    titleAr: 'الجزائر تطلق استراتيجية وطنية كبرى للتحول الرقمي وتطوير المدن الذكية بحلول 2030',
    titleFr: 'L’Algérie lance une grande stratégie nationale de transformation numérique et de villes intelligentes d’ici 2030',
    excerptAr: 'أعلنت الحكومة عن حزمة إجراءات واسعة النطاق لتسريع مسار الرقمنة في الإدارات العمومية، وتحديث البنية التحتية للاتصالات لدعم الاقتصاد الرقمي والشركات الناشئة.',
    excerptFr: 'Le gouvernement a annoncé un vaste ensemble de mesures pour accélérer la numérisation des administrations publiques et moderniser l’infrastructure télécom.',
    contentAr: `في خطوة استراتيجية نحو بناء اقتصاد معرفي مستدام، أقر المجلس الوزاري المشترك خطة عمل شاملة لتعزيز البنية التحتية للاتصالات الرقمية في مختلف ولايات الوطن. وتتضمن الخطة ربط كافة المؤسسات التعليمية والإدارية بشبكة الألياف البصرية ذات السرعة العالية، فضلاً عن إطلاق حاضنات تكنولوجية جهوية لدعم الشباب المبتكرين.

وأكد وزير الرقمنة والإحصاء أن هذه الخطوة ستساهم في تقليص البيروقراطية بنسبة تتجاوز 75% قبل نهاية العام الجاري، مع توفير خدمات إلكترونية آمنة وسهلة الولوج للمواطنين داخل وخارج الوطن.

كما تشمل الاستراتيجية شراكات دولية مع كبرى شركات التكنولوجيا العالمية لنقل المعارف وتوطين مراكز تخزين البيانات الحساسة، مما يكرس السيادة الرقمية للجزائر ويضعها في مصاف الدول الرائدة إقليمياً في مجال الأمن السيبراني.`,
    contentFr: `Dans une démarche stratégique vers l'édification d'une économie de la connaissance durable, le conseil interministériel a adopté un plan d'action global pour renforcer l'infrastructure des télécommunications numériques à travers les wilayas du pays.

Le plan comprend la connexion de l'ensemble des institutions éducatives et administratives au réseau de fibre optique à haut débit, ainsi que le lancement de incubateurs technologiques régionaux.

Le ministre de la Numérisation a souligné que cette initiative contribuera à réduire la bureaucratie de plus de 75% d'ici la fin de l'année en cours, tout en offrant des services électroniques sécurisés aux citoyens.`,
    category: 'algeria',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    imageCaptionAr: 'صورة تعبيرية لمراكز البيانات والتحول الرقمي بالجزائر',
    imageCaptionFr: 'Illustration des centres de données et de la transformation numérique en Algérie',
    authorId: 'auth-2',
    publishedAt: '2026-10-11T08:30:00Z',
    views: 14250,
    likes: 890,
    isBreaking: true,
    isFeatured: true,
    tags: ['الرقمية', 'الجزائر', 'تكنولوجيا', 'اقتصاد', '2030']
  },
  {
    id: 'art-2',
    titleAr: 'احتياطي الهيدروcarbons في الجزائر يعزز موقعها كممون موثوق للطاقة في المتوسط',
    titleFr: 'Les réserves d’hydrocarbures de l’Algérie renforcent son rôle de fournisseur d’énergie fiable en Méditerranée',
    excerptAr: 'تواصل سوناطراك تحقيق نتائج إيجابية بفضل عقود الشراكة الدولية واستثمارات التنقيب المتقدمة، مما يضمن أمن الإمدادات الطاقوية لأوروبا وشمال إفريقيا.',
    excerptFr: 'Sonatrach continue de réaliser des résultats positifs grâce à des contrats de partenariat international et des investissements avancés en exploration.',
    contentAr: `سجل مجمع سوناطراك ارتفاعاً ملحوظاً في حجم الصادرات الطاقوية خلال الفصل الثالث من السنة الجارية، مستفิดاً من استثمارات ضخمة خصصت لتحديث حقول الإنتاج وتحسين كفاءة استغلال الغاز الطبيعي.

وفي تصريحات خاصة على هامش القناة الطاقوية، أكد خبراء اقتصاد أن المشاريع المشتركة مع كبرى الشركات الأوروبية والإيطالية والاسبانية تضمن استمرارية تدفق الإمدادات نحو الضفة الشمالية للمتوسط في ظل التحديات الجيوسياسية العالمية الراهنة.

كما تولي السلطات العليا اهتماماً بالغاً بمشاريع الطاقة النظيفة والهيدروجين الأخضر ضمن خطة الانتقال الطاقوي تدريجياً نحو مصادر مستدامة.`,
    contentFr: `Le groupe Sonatrach a enregistré une hausse notable du volume des exportations énergétiques au cours du troisième trimestre, bénéficiant d'investissements massifs.

Les experts économiques soulignent que les projets conjoints avec de grandes entreprises européennes garantissent la continuité de l'approvisionnement vers le nord de la Méditerranée.`,
    category: 'economy',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'منشآت طاقوية حديثة تابعة لسوناطراك',
    imageCaptionFr: 'Installations énergétiques modernes de Sonatrach',
    authorId: 'auth-3',
    publishedAt: '2026-10-11T07:15:00Z',
    views: 9820,
    likes: 645,
    isBreaking: false,
    isFeatured: true,
    tags: ['سوناطراك', 'طاقة', 'غاز', 'اقتصاد', 'متوسط']
  },
  {
    id: 'art-3',
    titleAr: 'المنتخب الوطني الجزائري ينهي تحضيراته لمواجهة الحاسمة في تصفيات المونديال',
    titleFr: 'L’équipe nationale algérienne achève ses préparatifs pour le match décisif des éliminatoires du Mondial',
    excerptAr: 'يسود تركيز شديد في تربص سيدي موسى الفني تحت قيادة الطاقم الفني، وسط عزيمة قوية للاعبين على تحقيق الانتصار وإسعاد الجماهير الوفية.',
    excerptFr: 'Une grande concentration règne au centre technique de Sidi Moussa sous la houlette du staff technique, avec une forte détermination des joueurs.',
    contentAr: `أجرى لاعبو المنتخب الوطني لكرة القدم حصة تدريبية مكثفة مساء أمس بالمركز التقني لسيدي موسى، ركز خلالها المدرب على الجوانب التكتيكية وتصحيح الأخطاء الدفاعية تحسباً للمباراة الهامة المقبلة.

وشهدت التدريبات حضوراً بكامل العناصر بعد الالتحاق المتتالي للمحترفين في البطولات الأوروبية والعربية، وسط معنويات مرتفعة وأجواء أخوية تعكس رغبة الجميع في حجز بطاقة التأهل مبكراً.

وتترقب الجماهير الجزائرية بشغف كبير هذه المواجهة لدعم "الخضر" في رحلتهم نحو التألق القاري والعالمي.`,
    contentFr: `Les joueurs de l'équipe nationale de football ont effectué une séance d'entraînement intensive hier soir au centre technique de Sidi Moussa, axée sur les aspects tactiques.

L'entraînement a vu la présence de tous les éléments après l'arrivée successive des professionnels évoluant en Europe et dans le monde arabe, dans une ambiance de grande concentration.`,
    category: 'sport',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'أجواء تدريبات الخضر بمركز سيدي موسى',
    imageCaptionFr: 'Ambiance des entraînements des Verts à Sidi Moussa',
    authorId: 'auth-1',
    publishedAt: '2026-10-10T22:00:00Z',
    views: 24100,
    likes: 1820,
    isBreaking: true,
    isFeatured: false,
    tags: ['الخضر', 'رياضة', 'المنتخب الجزائري', 'كرة القدم', 'مونديال']
  },
  {
    id: 'art-4',
    titleAr: 'معرض الجزائر الدولي للكتاب يسلط الضوء على الأدب المعاصر والتراث المغاربي',
    titleFr: 'Le Salon international du livre d’Alger met en lumière la littérature contemporaine et le patrimoine maghrébin',
    excerptAr: 'بمشاركة مئات دور النشر المحلية والعالمية، تنطلق فعاليات التظاهرة الثقافية الأبرز في المنطقة مع برنامج ندوات فكرية ولقاءات توقيع واسعة.',
    excerptFr: 'Avec la participation de centaines de maisons d’édition locales et internationales, la plus grande manifestation culturelle de la région ouvre ses portes.',
    contentAr: `تستعد قصر المعارض بالصنوبر البحري لاحتضان الطبعة الجديدة لمعرض الجزائر الدولي للكتاب (سيلا)، وسط إقبال مرتقب لآلاف الزوار من عشاق القراءة والباحثين.

ويتميز برنامج هذه السنة بتسليط الضوء على الأدب المغاربي المقارن، وتنظيم ورشات تكوينية للكتاب الشباب، إضافة إلى تكريم شخصيات أدبية وفكرية بارزة بصمت المشهد الثقافي الوطني والعربي.`,
    contentFr: `Le Palais des expositions des Pins Maritimes s'apprête à accueillir la nouvelle édition du Salon international du livre d'Alger (SILA), avec une affluence attendue de milliers de visiteurs.

Le programme de cette année se caractérise par la mise en valeur de la littérature maghrébine comparée, l'organisation d'ateliers de formation pour les jeunes écrivains.`,
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'أجنحة الكتب وقاعات العرض في المعرض',
    imageCaptionFr: 'Stands de livres et salles d’exposition',
    authorId: 'auth-4',
    publishedAt: '2026-10-10T16:45:00Z',
    views: 7340,
    likes: 410,
    isBreaking: false,
    isFeatured: false,
    tags: ['سيلا', 'ثقافة', 'كتب', 'معرض', 'الأدب']
  },
  {
    id: 'art-5',
    titleAr: 'تدشين مشاريع تنموية كبرى بولاية وهران لتعزيز الجذب السياحي والاقتصادي',
    titleFr: 'Inauguration de grands projets de développement dans la wilaya d’Oran pour stimuler l’attractivité touristique',
    excerptAr: 'شملت المشاريع الجديدة تهيئة الواجهة البحرية، افتتاح مرافق ترفيهية ذكية، وتوسيع شبكة النقل الحضري لتلبية تطلعات الساكنة والزوار.',
    excerptFr: 'Les nouveaux projets comprennent l’aménagement du front de mer, l’ouverture d’installations de loisirs intelligentes et l’expansion du transport urbain.',
    contentAr: `في إطار سياسة التنمية المستدامة والجهوية المتوازنة، أشرفت السلطات المحلية بولاية وهران على تدشين سلسلة من المشاريع الهيكلية التي ترتقي بعاصمة الغرب الجزائري إلى مصاب الحواضر المتوسطية الكبرى.

وتضمنت التدشينات شبكة طرقات عصرية، ومساحات خضراء كبرى، ومركبات سياحية صُممت وفق أحدث المعايير البيئية الهندسية العالمية، مما سيخلق آلاف مناصب الشغل للشباب المحلي.`,
    contentFr: `Dans le cadre de la politique de développement durable et d'équilibre régional, les autorités locales de la wilaya d'Oran ont supervisé l'inauguration d'une série de projets structurants.

Les inaugurations comprennent un réseau routier moderne, de grands espaces verts et des complexes touristiques conçus selon les dernières normes environnementales.`,
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'معالم وهران الواجهة البحرية',
    imageCaptionFr: 'Le front de mer d’Oran',
    authorId: 'auth-2',
    publishedAt: '2026-10-10T14:20:00Z',
    views: 8910,
    likes: 520,
    isBreaking: false,
    isFeatured: false,
    tags: ['وهران', 'مشاريع', 'تنمية', 'سياحة', 'محلية']
  },
  {
    id: 'art-6',
    titleAr: 'ابتكار جزائري جديد في مجال الذكاء الاصطناعي لتشخيص الزراعة الذكية',
    titleFr: 'Une nouvelle innovation algérienne en intelligence artificielle pour le diagnostic de l’agriculture intelligente',
    excerptAr: 'فريق من المهندسين الشباب يبتكرون تطبيقاً ذكياً يعتمد على رؤية الحاسوب لمراقبة صحة المحاصيل الزراعية وتوفير استهلاك المياه.',
    excerptFr: 'Une équipe de jeunes ingénieurs innove avec une application intelligente basée sur la vision par ordinateur pour surveiller la santé des cultures.',
    contentAr: `نجح مجموعة من الباحثين والمهندسين الجزائريين في تطوير نظام ذكاء اصطناعي متقدم قادر على قراءة صور الأقمار الصناعية والطائرات المسيرة لتحليل الحالة الصحية للمحاصيل الزراعية بدقة تتجاوز 94%.

ويأتي هذا الابتكار لدعم المزارعين في المناطق الهضبية والجنوبية لتحسين الإنتاجية الزراعية وترشيد استهلاك المياه والموارد في ظل التغيرات المناخية العالمية.`,
    contentFr: `Un groupe de chercheurs et d'ingénieurs algériens a réussi à développer un système d'intelligence artificielle avancé capable de lire des images satellites et de drones.

Cette innovation vient soutenir les agriculteurs des régions des Hauts Plateaux et du Sud pour améliorer la productivité agricole et rationaliser la consommation d'eau.`,
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'استخدام التكنولوجيا في الزراعة الحديثة',
    imageCaptionFr: 'Utilisation de la technologie dans l’agriculture moderne',
    authorId: 'auth-3',
    publishedAt: '2026-10-09T19:10:00Z',
    views: 6520,
    likes: 495,
    isBreaking: false,
    isFeatured: false,
    tags: ['ذكاء اصطناعي', 'زراعة', 'تكنولوجيا', 'ابتكار']
  },
  {
    id: 'art-7',
    titleAr: 'الأسواق العالمية تترقب اجتماعات البنوك المركزية وسط مؤشرات استقرار أسعار النفط',
    titleFr: 'Les marchés mondiaux attendent les réunions des banques centrales dans un contexte de stabilité du pétrole',
    excerptAr: 'حافظت أسعار الخام على مستوياتها المستقرة في تعاملات الاسبوع بفضل توازن العرض والطلب في الأسواق الآسيوية والأوروبية.',
    excerptFr: 'Les prix du brut ont maintenu des niveaux stables lors des transactions hebdomadaires grâce à l’équilibre de l’offre et de la demande.',
    contentAr: `سجلت أسعار النفط استقراراً نسبياً في الأسواق الدولية، وسط ترقب المستثمرين لقرارات البنوك المركزية الكبرى بشأن أسعار الفائدة ومستويات التضخم.

ويرى المحللون أن الأسواق المالية تتجه نحو مرحلة هدوء بعد تقلبات شهدتها الأشهر الماضية، مع استمرار الطلب القوي في الاقتصادات الناشئة.`,
    contentFr: `Les prix du pétrole ont enregistré une stabilité relative sur les marchés internationaux, au milieu de l'anticipation par les investisseurs des décisions des grandes banques centrales.`,
    category: 'world',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
    imageCaptionAr: 'أسواق المال والتجارة العالمية',
    imageCaptionFr: 'Marchés financiers et commerce mondial',
    authorId: 'auth-3',
    publishedAt: '2026-10-09T11:00:00Z',
    views: 5120,
    likes: 310,
    isBreaking: false,
    isFeatured: false,
    tags: ['اقتصاد عالمي', 'أسواق', 'نفط', 'بنوك']
  }
];

export const INITIAL_POLL: Poll = {
  id: 'poll-1',
  questionAr: 'ما هو القطاع الأكثر أهمية لدعم النمو الاقتصادي في الجزائر خلال السنوات القادمة؟',
  questionFr: 'Quel est le secteur le plus important pour soutenir la croissance économique en Algérie ces prochaines années ?',
  options: [
    { id: 'opt-1', textAr: 'التحول الرقمي والشركات الناشئة', textFr: 'Transformation numérique et startups', votes: 1420 },
    { id: 'opt-2', textAr: 'الطاقات المتجددة والهيدروجين الأخضر', textFr: 'Énergies renouvelables et hydrogène vert', votes: 980 },
    { id: 'opt-3', textAr: 'الفلاحة الصحراوية والصناعات الغذائية', textFr: 'Agriculture saharienne et agroalimentaire', votes: 1150 },
    { id: 'opt-4', textAr: 'الصناعة التحويلية والمناجم', textFr: 'Industrie manufacturière et minière', votes: 740 },
  ],
  totalVotes: 4290
};
