'use client';

import { useState, useEffect } from 'react';
import { useFollowing } from '@/context/FollowingContext';
import { newsArticles } from '@/data/newsData';
import { NewsItem } from '@/types';
import { Clock, ChevronRight, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RadarPage() {
  const { followingIds, unfollow } = useFollowing();
  const [followingNews, setFollowingNews] = useState<NewsItem[]>([]);
  const [readDirections, setReadDirections] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // 获取关注的新闻
    const news = newsArticles.filter(item => followingIds.includes(item.id));
    setFollowingNews(news);

    // 从本地存储加载已读视角
    try {
      const stored = localStorage.getItem('lens-news-read-directions');
      if (stored) {
        setReadDirections(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load read directions from storage:', error);
    }
  }, [followingIds]);

  // 计算认知进度
  const getProgress = (newsId: string) => {
    const news = newsArticles.find(item => item.id === newsId);
    if (!news) return 0;
    
    const totalDirections = news.conceptDirections.length;
    const readCount = readDirections[newsId]?.length || 0;
    return Math.round((readCount / totalDirections) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (followingNews.length === 0) {
    return (
      <div className="min-h-screen bg-lens-cream text-lens-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-lens-dark/10 rounded-full flex items-center justify-center mb-4">
            <Bookmark className="w-8 h-8 text-lens-gold" />
          </div>
          <h1 className="text-2xl font-bold mb-2">暂无关注内容</h1>
          <p className="text-gray-600 mb-6">在首页浏览新闻，点击关注按钮，关注感兴趣的新闻</p>
          <Link href="/home" className="inline-flex items-center space-x-2 px-4 py-2 bg-lens-dark text-white rounded-lg hover:bg-lens-dark/90 transition-colors">
            <span>去首页</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lens-cream text-lens-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-serif font-bold mb-8">关注追踪</h1>
        
        <div className="space-y-6">
          {followingNews.map((news) => {
            const progress = getProgress(news.id);
            return (
              <div key={news.id} className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-lens-gold/10 text-lens-gold text-sm font-medium rounded-full mb-2">
                      {news.category}
                    </span>
                    <h2 className="text-xl font-bold mb-2">
                      <Link href={`/topic/${news.id}`} className="hover:text-lens-gold transition-colors">
                        {news.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(news.publishTime)}
                    </div>
                  </div>
                  <button
                    onClick={() => unfollow(news.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span className="text-sm">取消关注</span>
                  </button>
                </div>
                
                {/* 认知进度 */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">认知进度</span>
                    <span className="text-sm text-lens-gold">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-lens-gold h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    已探索 {readDirections[news.id]?.length || 0} / {news.conceptDirections.length} 个视角
                  </p>
                </div>
                
                {/* 核心要点预览 */}
                <div className="bg-gradient-to-br from-lens-dark/5 to-lens-gold/5 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-1.5 mb-3">
                    <Sparkles className="w-4 h-4 text-lens-gold" />
                    <span className="text-xs font-medium text-lens-gold uppercase tracking-wider">
                      核心要点
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {news.summary[0]}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Link 
                    href={`/topic/${news.id}`}
                    className="inline-flex items-center space-x-2 text-sm font-medium text-lens-dark hover:text-lens-gold transition-colors"
                  >
                    <span>继续探索</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
