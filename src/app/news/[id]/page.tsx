'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getNewsById } from '@/data/newsData';
import NewsReader from '@/components/news/NewsReader';
import ConceptDirections from '@/components/news/ConceptDirections';
import KnowledgeDrawer from '@/components/news/KnowledgeDrawer';
import FollowButton from '@/components/common/FollowButton';
import { ConceptDirection } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id as string;
  const news = getNewsById(newsId);

  const [selectedDirection, setSelectedDirection] = useState<ConceptDirection | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!news) {
    notFound();
  }

  const handleSelectDirection = (direction: ConceptDirection) => {
    setSelectedDirection(direction);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedDirection(null), 300);
  };

  return (
    <main className="min-h-screen bg-lens-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button and Follow */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/home"
            className="flex items-center text-gray-600 hover:text-lens-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>返回首页</span>
          </Link>
          <FollowButton newsId={news.id} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <NewsReader article={news} />
          </div>

          {/* Sidebar - Concept Directions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ConceptDirections
                directions={news.conceptDirections}
                onSelect={handleSelectDirection}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Drawer */}
      <KnowledgeDrawer
        direction={selectedDirection}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </main>
  );
}
