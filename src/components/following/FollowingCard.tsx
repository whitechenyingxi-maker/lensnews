'use client';

import { NewsItem } from '@/types';
import FollowButton from '@/components/common/FollowButton';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FollowingCardProps {
  news: NewsItem;
}

export default function FollowingCard({ news }: FollowingCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <span className="inline-block px-3 py-1 bg-lens-gold/10 text-lens-gold text-xs font-medium rounded-full mb-3">
            {news.category}
          </span>
          <Link href={`/news/${news.id}`}>
            <h3 className="text-xl font-bold text-lens-dark hover:text-lens-gold transition-colors leading-snug">
              {news.title}
            </h3>
          </Link>
        </div>
        <FollowButton newsId={news.id} size="sm" showText={false} />
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-lens-gold" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            核心要点
          </span>
        </div>
        <ul className="space-y-1.5">
          {news.summary.map((point, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-lens-gold mt-0.5">•</span>
              <span className="line-clamp-1">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {news.conceptDirections.length} 个探索方向
        </span>
        <Link
          href={`/news/${news.id}`}
          className="flex items-center text-sm font-medium text-lens-dark hover:text-lens-gold transition-colors"
        >
          深度阅读
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
