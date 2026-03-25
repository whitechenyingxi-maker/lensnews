export interface RelatedLink {
  title: string;
  url: string;
  source: string;
}

export interface ConceptDirection {
  id: string;
  title: string;
  shortDescription: string;
  summary: string;
  fullExplanation: string;
  relatedLinks: RelatedLink[];
  relatedTerms: string[];
  importance: 'high' | 'medium' | 'low';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  content: string;
  category: string;
  publishTime: string;
  conceptDirections: ConceptDirection[];
}

export type Category = '全部' | '财经' | '历史' | '旅游' | '军事' | '科技' | '国际';

export const CATEGORIES: Category[] = ['全部', '财经', '历史', '旅游', '军事', '科技', '国际'];
