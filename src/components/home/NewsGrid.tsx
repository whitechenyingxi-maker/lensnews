'use client';

import { NewsItem } from '@/types';
import NewsCard from './NewsCard';

interface NewsGridProps {
  news: NewsItem[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">该分类下暂无新闻</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
