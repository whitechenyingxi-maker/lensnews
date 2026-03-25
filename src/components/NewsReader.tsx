'use client';

import { NewsItem } from '@/types';
import { Sparkles } from 'lucide-react';

interface NewsReaderProps {
  article: NewsItem;
}

export default function NewsReader({ article }: NewsReaderProps) {
  const paragraphs = article.content.split('\n\n');

  return (
    <article className="max-w-3xl mx-auto">
      {/* Title */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-lens-dark leading-tight mb-6">
          {article.title}
        </h1>
        
        {/* Core Summary - 3 Sentences */}
        <div className="bg-gradient-to-br from-lens-dark to-gray-800 rounded-xl p-6 text-white">
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
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Divider */}
      <div className="my-12 flex items-center space-x-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <span className="text-sm text-gray-400 font-medium">探索更多视角</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    </article>
  );
}
