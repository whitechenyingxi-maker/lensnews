'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Sparkles, FileText, Lightbulb, Clock, Link2, Tag } from 'lucide-react';
import Link from 'next/link';
import { newsArticles } from '@/data/newsData';

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<any>(null);
  const [isAdminNews, setIsAdminNews] = useState(false);

  useEffect(() => {
    if (!id) return;

    // 首先查找是否是管理员添加的新闻
    const savedRecords = localStorage.getItem('lens-news-admin-records');
    if (savedRecords) {
      const records = JSON.parse(savedRecords);
      const adminNews = records.find((record: any) => record.id === id);
      if (adminNews) {
        setNews(adminNews);
        setIsAdminNews(true);
        return;
      }
    }

    // 否则查找默认新闻
    const defaultNews = newsArticles.find((item) => item.id === id);
    if (defaultNews) {
      setNews(defaultNews);
      setIsAdminNews(false);
    }
  }, [id]);

  if (!id || !news) {
    return (
      <div className="min-h-screen bg-lens-cream text-lens-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">加载中...</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-lens-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/home"
          className="inline-flex items-center text-sm text-gray-600 hover:text-lens-gold mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回首页
        </Link>

        {/* News Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-lens-gold/10 text-lens-gold rounded-full">
                {isAdminNews ? '财经' : news.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(news.createdAt || news.publishTime).toLocaleString('zh-CN')}
              </span>
            </div>
            {isAdminNews && (
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-lens-gold hover:text-amber-600"
              >
                <Link2 className="w-4 h-4 mr-1" />
                原文链接
              </a>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-lens-dark mb-4 leading-tight">
            {news.title}
          </h1>

          {!isAdminNews && news.summary && (
            <div className="bg-gray-50 border border-gray-200/50 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Sparkles className="w-5 h-5 text-lens-gold mr-2" />
                核心要点
              </h2>
              <ul className="space-y-2">
                {news.summary.map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-lens-gold rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* News Content */}
          {!isAdminNews && news.content && (
            <div className="bg-white rounded-xl p-6 border border-gray-200/50">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-lens-gold" />
                <h2 className="text-lg font-bold">事件详情</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                {news.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Admin News Analysis */}
          {isAdminNews && news.selectedViewpoints && news.selectedViewpoints.length > 0 && (
            <div className="space-y-6">
              {news.selectedViewpoints.map((viewpoint: any) => (
                <div key={viewpoint.id} className="bg-white rounded-xl p-6 border border-gray-200/50 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-lens-gold" />
                    <h2 className="text-lg font-bold text-lens-gold">
                      {viewpoint.title}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{viewpoint.insight}</p>
                    <p className="text-gray-600">{viewpoint.content}</p>
                  </div>
                  {viewpoint.anchors && viewpoint.anchors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {viewpoint.anchors.map((anchor: string, index: number) => (
                        <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {anchor}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Default News Concept Directions */}
          {!isAdminNews && news.conceptDirections && (
            <div className="space-y-6">
              {news.conceptDirections.map((direction: any) => (
                <div key={direction.id} className="bg-white rounded-xl p-6 border border-gray-200/50 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-lens-gold" />
                    <h2 className="text-lg font-bold text-lens-gold">
                      {direction.title}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{direction.shortDescription}</p>
                    <p className="text-gray-600 mb-4">{direction.fullExplanation}</p>
                  </div>
                  {direction.relatedTerms && direction.relatedTerms.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {direction.relatedTerms.map((term: string, index: number) => (
                        <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200/50 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Tag className="w-4 h-4 mr-2" />
            <span>Lens News</span>
          </div>
          <Link
            href="/home"
            className="text-sm font-medium text-lens-gold hover:text-amber-600"
          >
            返回首页 →
          </Link>
        </div>
      </div>
    </main>
  );
}
