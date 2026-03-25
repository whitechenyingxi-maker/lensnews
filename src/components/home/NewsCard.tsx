'use client';

import { NewsItem } from '@/types';
import FollowButton from '@/components/common/FollowButton';
import { Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    });
  };

  const navigateToTopic = () => {
    window.location.href = `/topic/${news.id}`;
  };

  return (
    <article 
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onClick={navigateToTopic}
    >
      {/* Header with category and date */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <span className="px-3 py-1 bg-lens-gold/10 text-lens-gold text-xs font-medium rounded-full">
          {news.category}
        </span>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {formatDate(news.publishTime)}
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pb-4">
        <h2 className="text-lg font-bold text-lens-dark leading-snug group-hover:text-lens-gold transition-colors line-clamp-2">
          {news.title}
        </h2>
      </div>

      {/* Summary */}
      <div className="px-5 pb-5 flex-1">
        <div className="bg-gradient-to-br from-lens-dark to-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-lens-gold" />
            <span className="text-xs font-medium text-lens-gold uppercase tracking-wider">
              核心要点
            </span>
          </div>
          <ul className="space-y-2">
            {news.summary.slice(0, 2).map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-5 h-5 bg-lens-gold/20 rounded-full flex items-center justify-center text-xs font-medium text-lens-gold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed line-clamp-2">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer with follow button */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50">
        <span className="text-sm text-gray-400">
          {news.conceptDirections.length} 个探索方向
        </span>
        <div onClick={(e) => e.stopPropagation()}>
          <FollowButton newsId={news.id} size="sm" />
        </div>
      </div>
    </article>
  );
}
