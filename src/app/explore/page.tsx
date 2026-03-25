'use client';

import { useState } from 'react';
import CategoryNav from '@/components/layout/CategoryNav';
import NewsCard from '@/components/home/NewsCard';
import { newsArticles } from '@/data/newsData';
import Link from 'next/link';
import { Category } from '@/types';

export default function ExplorePage() {
  // 分类列表
  const categories: Category[] = ['科技', '国际', '历史', '军事', '财经'];
  
  // 分类状态
  const [activeCategory, setActiveCategory] = useState<Category>('全部');
  
  // 筛选新闻
  const filteredNews = activeCategory === '全部' 
    ? newsArticles 
    : newsArticles.filter(news => news.category === activeCategory);

  return (
    <div className="min-h-screen bg-lens-cream text-lens-dark">
      {/* 分类导航 */}
      <CategoryNav categories={['全部', ...categories]} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* 新闻信息流 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
