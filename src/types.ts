export type Language = 'ar' | 'fr';
export type Theme = 'dark' | 'light';

export interface Author {
  id: string;
  nameAr: string;
  nameFr: string;
  avatar: string;
  roleAr: string;
  roleFr: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface Article {
  id: string;
  titleAr: string;
  titleFr: string;
  excerptAr: string;
  excerptFr: string;
  contentAr: string;
  contentFr: string;
  category: string;
  imageUrl: string;
  imageCaptionAr?: string;
  imageCaptionFr?: string;
  authorId: string;
  publishedAt: string;
  views: number;
  likes: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  slug: string;
}

export interface Poll {
  id: string;
  questionAr: string;
  questionFr: string;
  options: {
    id: string;
    textAr: string;
    textFr: string;
    votes: number;
  }[];
  totalVotes: number;
}

export interface PdfNewspaper {
  id: string;
  titleAr: string;
  titleFr: string;
  date: string;
  coverUrl: string;
  pdfUrl: string;
  category: 'national' | 'international' | 'sport';
  publisherAr: string;
  publisherFr: string;
  pagesCount: number;
}

