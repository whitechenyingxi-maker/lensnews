'use client';

import { NewsItem } from '@/types';
import { Sparkles } from 'lucide-react';

interface NewsReaderProps {
  article: NewsItem;
}

export default function NewsReader({ article }: NewsReaderProps) {
  const paragraphs = article.content.split('\n\n');

  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
      {/* Category and Date */}
      <div className="flex items-center space-x-3 mb-6">
        <span className="px-3 py-1 bg-lens-gold/10 text-lens-gold text-sm font-medium rounded-full">
          {article.category}
        </span>
        <span className="text-gray-400 text-sm">
          {new Date(article.publishTime).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-lens-dark leading-tight mb-8">
        {article.title}
      </h1>

      {/* Core Summary - 3 Sentences */}
      <div className="bg-gradient-to-br from-lens-dark to-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-lens-gold" />
          <span className="text-sm font-medium text-lens-gold uppercase tracking-wider">
            核心要点
          </span>
        </div>
        <ul className="space-y-3">
          {article.summary.map((point, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-lens-gold/20 rounded-full flex items-center justify-center text-sm font-medium text-lens-gold mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-200 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-gray-700 leading-relaxed mb-6 text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
