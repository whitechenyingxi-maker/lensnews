'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { newsArticles } from '@/data/newsData';
import { NewsItem, ConceptDirection } from '@/types';
import { Sparkles, Clock, Bookmark, Share2, MessageSquare, FileText, Lightbulb } from 'lucide-react';

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!id) {
    return (
      <div className="min-h-screen bg-lens-cream text-lens-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">加载中...</h1>
        </div>
      </div>
    );
  }

  const news = newsArticles.find(item => item.id === id);

  if (!news) {
    return (
      <div className="min-h-screen bg-lens-cream text-lens-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">新闻不存在</h1>
          <p className="text-gray-600">请检查链接是否正确</p>
        </div>
      </div>
    );
  }

  const handleDirectionClick = (directionId: string) => {
    setSelectedDirection(directionId);
    setIsExpanded(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedDirectionData = selectedDirection 
    ? news.conceptDirections.find(direction => direction.id === selectedDirection)
    : null;

  return (
    <div className="min-h-screen bg-lens-cream text-lens-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧主内容区 */}
          <div className="lg:w-2/3">
            {/* 新闻头部 */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-lens-gold/10 text-lens-gold text-sm font-medium rounded-full mb-4">
                {news.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {news.title}
              </h1>
              
              {/* 操作按钮和时间信息 */}
              <div className="bg-white rounded-xl p-4 border border-gray-200/50 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-lens-gold transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-sm font-medium">追踪</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-lens-gold transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">分享</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-lens-gold transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">评论</span>
                  </button>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {formatDate(news.publishTime)}
                </div>
              </div>
              
              <div className="flex items-center justify-end text-gray-500 text-sm mb-6">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-lens-gold rounded-full mr-2"></span>
                    {news.conceptDirections.length} 个视角
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-lens-gold rounded-full mr-2"></span>
                    {news.content.split('\n\n').length} 段内容
                  </span>
                </div>
              </div>
              
              {/* 核心要点 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200/50 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-lens-gold" />
                  <h2 className="text-lg font-bold">核心要点</h2>
                </div>
                <div className="space-y-3">
                  {news.summary.map((item, index) => (
                    <p key={index} className="text-gray-700">{item}</p>
                  ))}
                </div>
              </div>
              
              {/* 新闻内容 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200/50 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-lens-gold" />
                  <h2 className="text-lg font-bold">事件详情</h2>
                </div>
                <div className="text-gray-700 space-y-4 leading-relaxed">
                  {news.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* 展开的视角分析 */}
              {isExpanded && selectedDirectionData && (
                <div className="bg-white rounded-xl p-6 border border-gray-200/50 mb-6 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-lens-gold" />
                    <h2 className="text-lg font-bold text-lens-gold">
                      {selectedDirectionData.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedDirectionData.shortDescription}</p>
                  <div className="space-y-4">
                    <p>{selectedDirectionData.summary}</p>
                    <p>{selectedDirectionData.fullExplanation}</p>
                  </div>
                  
                  {/* 相关术语 */}
                  {selectedDirectionData.relatedTerms.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">相关术语</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDirectionData.relatedTerms.map((term, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* 右侧视角选择器 */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              
              {/* 视角选择器 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200/50 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-lens-gold" />
                  <span>视角探索</span>
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                  从不同维度深入了解这个事件，获得启发
                </p>

                {/* 视角列表 */}
                <div className="space-y-3">
                  {news.conceptDirections.map((direction) => (
                    <button
                      key={direction.id}
                      onClick={() => handleDirectionClick(direction.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        selectedDirection === direction.id
                          ? 'border-lens-gold bg-lens-gold/5'
                          : 'border-gray-200 hover:border-lens-gold/50 hover:bg-gray-50'
                      }`}
                    >
                      <h3 className="font-medium mb-1">{direction.title}</h3>
                      <p className="text-sm text-gray-600">{direction.shortDescription}</p>
                      {direction.relatedTerms.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {direction.relatedTerms.slice(0, 3).map((term, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {term}
                            </span>
                          ))}
                          {direction.relatedTerms.length > 3 && (
                            <span className="px-2 py-0.5 text-xs text-gray-400">
                              +{direction.relatedTerms.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 相关术语云 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-bold mb-4">相关术语</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(news.conceptDirections.flatMap(d => d.relatedTerms))).map((term, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-full border border-gray-100"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
