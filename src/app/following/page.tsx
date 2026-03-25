'use client';

import { useMemo } from 'react';
import { useFollowing } from '@/context/FollowingContext';
import { getNewsByIds } from '@/data/newsData';
import FollowingCard from '@/components/following/FollowingCard';
import EmptyState from '@/components/common/EmptyState';
import { BookmarkX, Compass } from 'lucide-react';
import Link from 'next/link';

export default function FollowingPage() {
  const { followingIds } = useFollowing();
  const followingNews = useMemo(() => {
    return getNewsByIds(followingIds);
  }, [followingIds]);

  return (
    <main className="min-h-screen bg-lens-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-lens-dark mb-2">我的关注</h1>
          <p className="text-gray-500">
            已关注 {followingNews.length} 条新闻
          </p>
        </div>

        {/* Content */}
        {followingNews.length > 0 ? (
          <div className="space-y-6">
            {followingNews.map((news) => (
              <FollowingCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookmarkX className="w-10 h-10" />}
            title="还没有关注任何新闻"
            description="在首页浏览新闻，点击关注按钮，将感兴趣的新闻添加到这里，随时追踪最新进展。"
            action={
              <Link
                href="/home"
                className="inline-flex items-center px-6 py-3 bg-lens-dark text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                <Compass className="w-5 h-5 mr-2" />
                去首页
              </Link>
            }
          />
        )}
      </div>
    </main>
  );
}
