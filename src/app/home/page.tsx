'use client';

import { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
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
      {/* Brand Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-lens-gold/10 via-lens-cream to-lens-gold/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-lens-dark rounded-3xl shadow-lg mb-8 animate-bounce-slow">
              <Eye className="w-12 h-12 md:w-16 md:h-16 text-lens-gold" />
            </div>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-black text-lens-dark mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lens-gold via-amber-500 to-lens-gold">
                Lens
              </span>
              <span className="text-lens-dark"> News</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 font-light">
              用新的视角，发现新闻的深度
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-lens-gold to-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-md"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                已有 <span className="font-bold text-lens-gold">1,000+</span> 深度新闻
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-lens-gold/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
      </div>

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
