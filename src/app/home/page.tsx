'use client';

import { useState, useMemo } from 'react';
import CategoryNav from '@/components/layout/CategoryNav';
import NewsGrid from '@/components/home/NewsGrid';
import { getAllNews } from '@/data/newsData';
import { Category } from '@/types';
import { useSearch } from '@/context/SearchContext';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('全部');
  const { searchQuery, setSearchQuery } = useSearch();
  const allNews = useMemo(() => getAllNews(), []);

  const filteredNews = useMemo(() => {
    let result = allNews;
    
    if (activeCategory !== '全部') {
      result = result.filter((news) => news.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((news) => 
        news.title.toLowerCase().includes(query) ||
        news.content.toLowerCase().includes(query) ||
        news.summary.some((point) => point.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery, allNews]);

  return (
    <main className="min-h-screen bg-lens-cream">
      {/* Category Navigation */}
      <CategoryNav
        categories={['全部', '财经', '历史', '旅游', '军事', '科技', '国际']}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-lens-dark mb-2">
            {searchQuery.trim() 
              ? `搜索结果: "${searchQuery}"` 
              : (activeCategory === '全部' ? '推荐新闻' : `${activeCategory}资讯`)}
          </h1>
          <p className="text-gray-500">
            共 {filteredNews.length} 条新闻{searchQuery.trim() ? '' : '，点击卡片探索深度分析'}
          </p>
        </div>

        {/* News Grid */}
        <NewsGrid news={filteredNews} />
      </div>
    </main>
  );
}
